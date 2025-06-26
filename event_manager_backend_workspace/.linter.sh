#!/bin/bash
cd /home/kavia/workspace/code-generation/eventmaster-backend-60705-2e54841f/event_manager_backend_workspace/event_manager_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

