# ============================================================
# EAL Analysis Backend — Production Dockerfile
# Installs: ExifTool (EXIF metadata), c2patool (Content Credentials),
#           CAMeL Tools (Arabic NLP), FastAPI/Uvicorn
# ============================================================
FROM python:3.11-slim

# ---- OS-level dependencies ----
# perl: required by ExifTool
# curl, unzip: for downloading c2patool binary
# libimage-exiftool-perl: ExifTool itself (Debian package)
# build-essential: needed for compiling some Python C extensions (camel-tools)
# git: needed by some pip packages that install from source
RUN apt-get update && apt-get install -y --no-install-recommends \
    perl \
    curl \
    unzip \
    ffmpeg \
    libimage-exiftool-perl \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# ---- Install c2patool (Content Authenticity Initiative) ----
# c2patool is the CLI for verifying C2PA content credentials
# Repo: github.com/contentauth/c2patool (BSD License)
# We download the pre-built Linux binary from GitHub Releases
ARG C2PATOOL_VERSION=0.9.12
RUN ARCH=$(dpkg --print-architecture) && \
    if [ "$ARCH" = "amd64" ]; then \
        RUST_TARGET="x86_64-unknown-linux-gnu"; \
    elif [ "$ARCH" = "arm64" ]; then \
        RUST_TARGET="aarch64-unknown-linux-gnu"; \
    else \
        echo "Unsupported arch: $ARCH" && exit 1; \
    fi && \
    curl -fsSL "https://github.com/contentauth/c2patool/releases/download/v${C2PATOOL_VERSION}/c2patool-v${C2PATOOL_VERSION}-${RUST_TARGET}.tar.gz" \
        -o /tmp/c2patool.tar.gz && \
    tar -xzf /tmp/c2patool.tar.gz -C /usr/local/bin/ && \
    chmod +x /usr/local/bin/c2patool && \
    rm /tmp/c2patool.tar.gz

# ---- Verify OS tool installations ----
RUN exiftool -ver && c2patool --version

WORKDIR /app

# ---- Python dependencies ----
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ---- Download CAMeL Tools data (dialect identification + sentiment models) ----
# This pre-downloads models so the container starts fast at runtime.
# camel_data installs to ~/.camel_tools by default.
RUN python -m camel_tools.cli.camel_data -i defaults

# ---- Application code ----
COPY app ./app

EXPOSE 8000

# Run with 4 workers for production; adjust via UVICORN_WORKERS env var
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
