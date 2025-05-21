from transformers import pipeline
import re

print("Loading professional keyword extractor...")
try:
    # Using a better model for keyphrase extraction
    extractor = pipeline(
        "ner",
        model="ml6team/keyphrase-extraction-kbir-inspec",
        device=-1,
        aggregation_strategy="simple"
    )
    
    def clean_keyphrases(text):
        # Extract keyphrases
        results = extractor(text)
        
        # Process and clean the results
        keyphrases = set()
        for result in results:
            phrase = result['word'].strip()
            # Remove special tokens and fix spacing
            phrase = re.sub(r'Ġ|�', ' ', phrase).strip()
            phrase = re.sub(r'\s+', ' ', phrase)
            if 2 <= len(phrase.split()) <= 4:  # Keep phrases of 2-4 words
                keyphrases.add(phrase.lower())
        
        return sorted(keyphrases, key=len, reverse=True)[:10]  # Top 10 by length

    print("System ready! Enter text (type 'quit' to exit)\n")

    while True:
        try:
            user_input = input(">>> Professional text to analyze: ")
            
            if user_input.lower() in ('quit', 'exit', 'q'):
                print("\nGoodbye!")
                break
                
            if len(user_input) < 30:
                print("Please enter at least 30 characters")
                continue
                
            keywords = clean_keyphrases(user_input)
            
            print("\n:key: Key Professional Terms:")
            for i, kw in enumerate(keywords, 1):
                print(f"{i}. {kw.capitalize()}")
            print("-"*50)
        
        except KeyboardInterrupt:
            print("\nSession ended.")
            break
        except Exception as e:
            print(f"\nError: {str(e)}")
            print("Please try again\n")

except Exception as e:
    print(f"Model loading failed: {str(e)}")
    print("Alternative: Install KeyBERT (pip install keybert)")