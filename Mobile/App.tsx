import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Platform,
  Animated,
  Easing,
  Text as RNText,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import RNFS from 'react-native-fs';
import { initLlama, releaseAllLlama } from 'llama.rn';
import Voice from '@react-native-voice/voice';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

// Types for Llama responses
type LlamaResult = { text: string };
type LlamaContext = {
  completion: (args: {
    messages: { role: string; content: string }[];
    n_predict: number;
    stop: string[];
  }) => Promise<LlamaResult>;
};

const MODEL_FILE = 'Llama-3.2-3B-Instruct-Q2_K_Lds.gguf';
const MODEL_URL = 'https://huggingface.co/unsloth/Llama-3.2-3B-Instruct-GGUF/resolve/main/Llama-3.2-3B-Instruct-Q2_K_L.gguf';

const App: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [context, setContext] = useState<LlamaContext | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  type Analysis = {
    summary: string;
    keywords: string[];
  } | null;

  const [analysisResult, setAnalysisResult] = useState<Analysis>(null);

  // Animations
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Pulse animation for microphone
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.bezier(0.4, 0, 0.6, 1)
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.bezier(0.4, 0, 0.6, 1)
          }),
        ])
      ).start();
    } else {
      Animated.spring(pulseAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }).start();
    }
  }, [isRecording, pulseAnim]);

  // Fade in animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  // Progress animation
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, [progress]);

  // Initialize and setup the model
  useEffect(() => {
    let isActive = true;
    const setup = async () => {
      await downloadAndLoadModel();
    };
    setup();

    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      isActive = false;
      Voice.destroy().then(Voice.removeAllListeners);
      if (context) {
        releaseAllLlama();
      }
    };
  }, []);

  const onSpeechResults = (e: any) => {
    const t = e.value?.[0];
    if (t) setRecordedText(t);
    // Ne pas changer isRecording ici - laisser l'utilisateur arrêter manuellement
  };

  const onSpeechError = (e: any) => {
    setIsRecording(false);
  };

  const onSpeechPartialResults = (e: any) => {
    // Mise à jour en temps réel du texte pendant l'écoute
    const t = e.value?.[0];
    if (t && isRecording) {
      setRecordedText(t);
    }
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setRecordedText('');
      await Voice.start('en-US');
    } catch (error) {
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      setIsRecording(false);
    }
  };

  const downloadAndLoadModel = async () => {
    setIsDownloading(true);
    setProgress(0);

    try {
      const destPath = `${RNFS.DocumentDirectoryPath}/${MODEL_FILE}`;
      const fileExists = await RNFS.exists(destPath);

      if (!fileExists) {
        let lastProgress = 0;
        const download = RNFS.downloadFile({
          fromUrl: MODEL_URL,
          toFile: destPath,
          progress: (res) => {
            if (res.contentLength > 0) {
              const progressPercent = (res.bytesWritten / res.contentLength) * 100;
              if (Math.abs(progressPercent - lastProgress) > 1 || progressPercent === 100) {
                setProgress(progressPercent);
                lastProgress = progressPercent;
              }
            } else {
              const fallbackProgress = Math.min(res.bytesWritten / 10000000 * 100, 99);
              setProgress(fallbackProgress);
            }
          },
        });

        await new Promise(resolve => setTimeout(resolve, 600));
        await download.promise;
        setProgress(100);
      }

      await loadModel(destPath);
    } catch (error) {
      setProgress(0);
    } finally {
      setIsDownloading(false);
    }
  };

  const loadModel = async (modelPath: string) => {
    console.log("Loading model from path:", modelPath);
    if (context) {
      await releaseAllLlama();
      setContext(null);
    }
    try {
      const llamaContext = await initLlama({
        model: modelPath,
        use_mlock: true,
        n_ctx: 2048,
        n_gpu_layers: 1,
      });
      console.log("Model loaded successfully.");
      setContext(llamaContext);
    } catch (err) {
      console.error("Failed to initialize model:", err);
    }
  };

  const analyzeText = async () => {
    if (!recordedText || !context) return;
    if (isRecording) {
      await stopRecording();
    }

    setIsProcessing(true);
    setAnalysisResult(null);
    Keyboard.dismiss();

    try {
      const prompt = `Analyze the following text. Return a JSON with: "summary" (short summary), "keywords" (important terms). Format your response as: {"summary":"...","keywords":["keyword1","keyword2"]}. Text: "${recordedText}"`;

      const result = await context.completion({
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant that analyzes text and returns structured JSON output.' },
          { role: 'user', content: prompt }
        ],
        n_predict: 1000,
        stop: ['</s>', '<|end|>', 'user:', 'assistant:']
      });

      console.log('Raw LLM result:', result.text);

      let jsonText = result.text.trim();
      jsonText = jsonText.replace(/<\|eot_id\|>/g, '').trim();

      if (jsonText.startsWith('Raw LLM result:')) {
        jsonText = jsonText.replace('Raw LLM result:', '').trim();
      }

      const parsedResult = JSON.parse(jsonText);
      const summary = parsedResult.summary || 'No summary available.';
      const keywords = parsedResult.keywords || [];

      setAnalysisResult({ summary, keywords });
    } catch (error) {
      setAnalysisResult({ summary: 'Error during analysis: ' + error, keywords: [] });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderKeywords = () => {
    if (!analysisResult?.keywords) return null;

    return analysisResult.keywords.map((keyword: string, index: number) => (
      <View key={index} style={styles.keywordTag}>
        <RNText style={styles.keywordText}>{keyword}</RNText>
      </View>
    ));
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Header */}
              <View style={styles.header}>
                <RNText style={styles.title}>Rezum</RNText>
                <RNText style={styles.subtitle}>AI-Powered Text Analysis</RNText>
              </View>

              {/* Main Content */}
              {isDownloading ? (
                <View style={styles.downloadContainer}>
                  <View style={styles.downloadCard}>
                    <MaterialCommunityIcons
                      name="download"
                      size={48}
                      color="#64b5f6"
                      style={styles.downloadIcon}
                    />
                    <RNText style={styles.downloadTitle}>Preparing AI Model</RNText>
                    <RNText style={styles.downloadText}>
                      Downloading neural network...
                    </RNText>

                    {/* Custom Progress Bar */}
                    <View style={styles.progressContainer}>
                      <View style={styles.progressTrack}>
                        <Animated.View
                          style={[
                            styles.progressFill,
                            {
                              width: progressAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                                extrapolate: 'clamp',
                              }),
                            }
                          ]}
                        />
                      </View>
                      <RNText style={styles.progressText}>
                        {progress.toFixed(1)}%
                      </RNText>
                    </View>
                  </View>
                </View>
              ) : (
                <>
                  {/* Recording Section */}
                  <View style={styles.recordingSection}>
                    <Animated.View
                      style={[
                        styles.micContainer,
                        { transform: [{ scale: pulseAnim }] }
                      ]}
                    >
                      <TouchableOpacity
                        style={[
                          styles.micButton,
                          isRecording && styles.micButtonActive
                        ]}
                        onPress={isRecording ? stopRecording : startRecording}
                        disabled={isDownloading || isProcessing}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={isRecording ? ['#ff6b6b', '#ff8e8e'] : ['#4fc3f7', '#29b6f6']}
                          style={styles.micGradient}
                        >
                          <MaterialCommunityIcons
                            name={isRecording ? "stop" : "microphone"}
                            size={32}
                            color="#ffffff"
                          />
                        </LinearGradient>
                      </TouchableOpacity>
                    </Animated.View>

                    <RNText style={styles.micText}>
                      {isRecording ? "Tap to stop recording" : "Tap to speak"}
                    </RNText>

                    {isRecording && !isProcessing && (
                      <View style={styles.recordingIndicator}>
                        <View style={styles.recordingDot} />
                        <RNText style={styles.recordingText}>
                          {recordedText ? "Transcribing..." : "Listening..."}
                        </RNText>
                      </View>
                    )}
                  </View>

                  {/* Recorded Text */}
                  {recordedText && (
                    <Animated.View
                      style={[styles.textCard, { opacity: fadeAnim }]}
                    >
                      <View style={styles.cardHeader}>
                        <MaterialCommunityIcons name="text" size={20} color="#64b5f6" />
                        <RNText style={styles.cardTitle}>Transcription</RNText>
                      </View>
                      <RNText style={styles.transcribedText} selectable>
                        {recordedText}
                      </RNText>

                      <TouchableOpacity
                        style={styles.analyzeButton}
                        onPress={analyzeText}
                        disabled={!context || isProcessing}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={['#667eea', '#764ba2']}
                          style={styles.analyzeGradient}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                        >
                          {isProcessing ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                          ) : (
                            <MaterialCommunityIcons name="brain" size={20} color="#ffffff" />
                          )}
                          <RNText style={styles.analyzeText}>
                            {isProcessing ? "Analyzing..." : "Analyze with AI"}
                          </RNText>
                        </LinearGradient>
                      </TouchableOpacity>
                    </Animated.View>
                  )}

                  {/* Analysis Results */}
                  {analysisResult && (
                    <Animated.View
                      style={[styles.resultsCard, { opacity: fadeAnim }]}
                    >
                      <View style={styles.cardHeader}>
                        <MaterialCommunityIcons name="chart-line" size={20} color="#4caf50" />
                        <RNText style={styles.cardTitle}>Analysis Results</RNText>
                      </View>

                      {/* Summary */}
                      <View style={styles.resultSection}>
                        <RNText style={styles.resultLabel}>Summary</RNText>
                        <View style={styles.summaryContainer}>
                          <RNText style={styles.summaryText} selectable>
                            {analysisResult.summary}
                          </RNText>
                        </View>
                      </View>

                      {/* Keywords */}
                      {analysisResult.keywords.length > 0 && (
                        <View style={styles.resultSection}>
                          <RNText style={styles.resultLabel}>Keywords</RNText>
                          <View style={styles.keywordsContainer}>
                            {renderKeywords()}
                          </View>
                        </View>
                      )}
                    </Animated.View>
                  )}
                </>
              )}
            </ScrollView>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#b3c7f7',
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  downloadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  downloadCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: width * 0.8,
  },
  downloadIcon: {
    marginBottom: 20,
  },
  downloadTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  downloadText: {
    fontSize: 16,
    color: '#b3c7f7',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#64b5f6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64b5f6',
    fontWeight: '600',
  },
  recordingSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  micContainer: {
    marginBottom: 20,
  },
  micButton: {
    borderRadius: 40,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  micButtonActive: {
    elevation: 12,
    shadowOpacity: 0.4,
  },
  micGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micText: {
    fontSize: 18,
    color: '#b3c7f7',
    fontWeight: '500',
    marginBottom: 10,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b6b',
    marginRight: 8,
  },
  recordingText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '500',
  },
  textCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  transcribedText: {
    fontSize: 16,
    color: '#e8f4fd',
    lineHeight: 24,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  analyzeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 60,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  analyzeGradient: {
    flexDirection: 'row',          // To align icon and text horizontally
    justifyContent: 'center',       // Center content horizontally
    alignItems: 'center',           // Center content vertically
    borderRadius: 16,
    minHeight: 60,
  },

  analyzeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 0,
  },
  resultsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resultSection: {
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64b5f6',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  summaryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryText: {
    fontSize: 15,
    color: '#e8f4fd',
    lineHeight: 22,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordTag: {
    backgroundColor: 'rgba(100, 181, 246, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(100, 181, 246, 0.3)',
  },
  keywordText: {
    fontSize: 14,
    color: '#64b5f6',
    fontWeight: '500',
  },
});

export default App;