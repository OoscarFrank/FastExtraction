# **Professional Keyword Extractor - Local AI for Raspberry Pi**  

## **📌 Overview**  
**Professional Keyword Extractor** is a lightweight AI-powered tool that extracts relevant keywords from professional profiles, resumes, or business documents. It runs entirely **locally on a Raspberry Pi**, ensuring privacy and offline functionality.  

Built with **Python** and powered by **Hugging Face's KBIR-inspec model**, this tool is optimized for efficiency on low-power devices while delivering accurate keyword extraction for professional use cases.  

---

## **✨ Features**  
✅ **Privacy-First** – All processing happens locally; no data leaves your device.  
✅ **Optimized for Raspberry Pi** – Runs efficiently on ARM-based hardware.  
✅ **No Internet Required** – Works completely offline.  
✅ **Easy-to-Usee** – Simple input/output workflow.  
✅ **Powered by Hugging Face’s NLP** – Uses `ml6team/keyphrase-extraction-kbir-inspec` for high-quality keyword extraction.  

---

## **🚀 Quick Start**  

### **Where**  
- **Raspberry Pi** (Recommended: Pi 4 or Pi 5 with 4GB+ RAM)
**OR**
- **Docker** environment

### **Installation**  
1. **Clone the repository**  
   ```bash
   git clone git@github.com:OoscarFrank/FastExtraction.git
   cd LLM
   ```

2. **Setup environment & run model**  
   ```bash
   1. docker run -it --platform linux/arm64 debian
   2. python3 -m venv myenv
   3. source myenv/bin/activate
   4. pip install transformers
   5. drop our file (summarizer.py)
   7. python summarizer.py
   ```
---

## **🔧 Steps**  
1. Download model
2. Model is listening
3. Enter your text and then press enter
4. Model is thinking
5. Keywords appear on screen

---

## **📂 Project Structure**  
```plaintext
.
├── LLM/                    # AI file
├── LandingFastExtraction/  # Landing page
│   ├── ...                 # Landing files
└── Pub                     # Folder with our advertising
```

---

## **📜 License**  
MIT License. See [LICENSE](LICENSE) for details.  

---

## **📬 Contact & Support**  
- **Names**:
    - Oscar FRANK
    - Younès BOUFRIOUA
    - Théotime SCHMELTZ

---

## **🔗 Useful Links**  
- [Hugging Face Model Card](https://huggingface.co/ml6team/keyphrase-extraction-kbir-inspec)  
- [Raspberry Pi Optimization Guide](https://www.raspberrypi.com/documentation/)  

---

**🎉 Happy Keyword Extraction!** 🚀
