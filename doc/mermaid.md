graph TD
    A[技術ブログTOP] --> B[ヘッダータブ]
    
    B --> C[TOP画面]
    B --> D[About画面]
    B --> E{ユーザー権限}
    
    E -->|admin| F[Post画面]
    E -->|一般ユーザー| G[Post非表示]
    
    C --> H[投稿された記事一覧表示]
    
    D --> I[固定URL表示]
    
    F --> J[記事投稿機能]
    J --> K[Markdown形式で記述]
    J --> L[プレビュー/編集モード切替]
    L --> M[編集モード]
    L --> N[プレビューモード]
    
    K --> O[投稿実行]
    O --> C
    
    style F fill:#ffcccc
    style J fill:#ffcccc
    style E fill:#ffffcc
    style A fill:#ccffcc