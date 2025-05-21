# Interaction Diagram: AI Model on Debian and Raspberry Pi

```mermaid
graph TD
    subgraph Local_Environment
        Debian[Debian OS]
        ModelDownload[Download AI model]
        LocalRun[Run the AI model locally]
    end

    subgraph User_Interaction
        Raspberry[listen]
        User[User]
        Raspberry[Interaction with Raspberry Pi]
        UserText[User sends text]
        RaspResponse[Raspberry Pi responds with a bullet list]
    end

    Debian --> ModelDownload
    ModelDownload --> LocalRun
    User -->|Sends text| Raspberry
    Raspberry -->|Responds with a bullet list| User
    LocalRun --> Raspberry
```

### Description

1. **Local Environment**:

   - A Debian OS is used to download an AI model from the Internet.
   - Once downloaded, the model is executed locally.

2. **User Interaction**:
   - The user interacts with a Raspberry Pi by sending text.
   - The Raspberry Pi processes the text, uses the AI model, and responds with a bullet list.
