# Marvox Enterprise Integrations via OpenClaw

Marvox supports generic messaging and monitoring integrations through **OpenClaw**, an agentic bridge that connects Marvox to your preferred enterprise stack.

## Supported Channels

OpenClaw can bridge Marvox events and character interactions to any messaging service it supports, including:

- **iMessage** (Local Developer / macOS Native)
- **Slack** (via Webhooks or Slack Apps)
- **Discord** (via Webhooks)
- **Telegram**
- **Sentry** (Error Triage and Feedback)

## Webhook Contract

Marvox emits events to OpenClaw via a standardized JSON webhook.

**Endpoint**: `POST /api/openclaw/event`
**Header**: `X-OpenClaw-Secret: <YOUR_SECRET>`

### Event Schema

```json
{
  "event_type": "build_complete | health_alert | sentry_triage | dev_alert",
  "message": "Human-readable description",
  "severity": "info | warn | critical",
  "details": {
    "project_id": "uuid",
    "metadata": "..."
  }
}
```

## Pro & Enterprise Features

### 1. Project Assistant (OpenClaw Bridge)
Allows developers to interact with Marvox characters directly from their IDE or messaging app.
- **Developer Persona**: iMessage-based local monitoring and "character-as-a-service" for debugging.
- **Enterprise Persona**: Slack/Discord bots that can answer story questions using Marvox's RAG engine.

### 2. Meeting Collaboration Room
A premium feature that integrates:
- **Human Participants**: Real-time multi-writer collaboration.
- **Characters**: AI characters that can roleplay and provide feedback.
- **Agentic Network**: Specialized agents (Writer, Continuity, Director) orchestrating the scene.

### 3. SRE & Health Monitoring
Autonomous monitoring of production infrastructure.
- **Heartbeats**: Hourly "I'm alive" updates.
- **Incident Alerts**: Critical notifications when database, redis, or AI services degrade.
- **Recovery Updates**: Notifications when services return to health.

## Configuration

Configure your OpenClaw agent to point to your Marvox deployment:

```json
{
  "marvox": {
    "backend_url": "https://your-marvox-domain.app",
    "webhook_secret": "YOUR_OPENCLAW_WEBHOOK_SECRET"
  }
}
```

---
*For technical support or private enterprise deployments, contact the Marvox SRE team.*
