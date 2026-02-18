# This dockerfile builds an image for the backend package.
# It should be executed with the root of the repo as docker context.

FROM node:24-trixie-slim

# Enable Corepack and activate the Yarn version defined in package.json
RUN corepack enable && corepack prepare yarn@4.4.1 --activate

# Set Python interpreter for node-gyp
ENV PYTHON=/usr/bin/python3

# Install build dependencies for native modules
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends \
      python3 g++ build-essential libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*

# IMPORTANT: Create cache directory for node user BEFORE switching user
RUN mkdir -p /home/node/.cache/node \
    && chown -R node:node /home/node/.cache

# Switch to least-privileged user
USER node
WORKDIR /app

# Copy Yarn config files
COPY --chown=node:node .yarn ./.yarn
COPY --chown=node:node .yarnrc.yml ./
COPY --chown=node:node backstage.json ./

# Production mode
ENV NODE_ENV=production

# Required for Backstage scaffolder
ENV NODE_OPTIONS="--no-node-snapshot"

# Copy repo skeleton first for better caching
COPY --chown=node:node yarn.lock package.json packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

# Install production dependencies
RUN --mount=type=cache,target=/home/node/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
    yarn workspaces focus --all --production

# Optional examples
COPY --chown=node:node examples ./examples

# Copy backend bundle + config
COPY --chown=node:node packages/backend/dist/bundle.tar.gz app-config*.yaml ./
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
