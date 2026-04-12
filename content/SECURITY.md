# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Marvox team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

To report a security issue, please use the GitHub Security Advisory ["Report a Vulnerability"](https://github.com/CyKiller/Marvox/security/advisories/new) tab.

The Marvox team will send a response indicating the next steps in handling your report. After the initial reply to your report, the security team will keep you informed of the progress towards a fix and full announcement, and may ask for additional information or guidance.

Report security bugs in third-party modules to the person or team maintaining the module.

## Security Considerations

### API Keys
- Never commit API keys to the repository
- Use environment variables for all sensitive configuration
- Rotate API keys regularly

### File Uploads
- All uploaded files are validated and sanitized
- File size limits are enforced
- Only supported file formats are accepted

### Audio Generation
- Generated audio files are stored securely
- Temporary files are cleaned up automatically
- User data is isolated by project

### Dependencies
- We regularly audit dependencies for security vulnerabilities
- Security updates are prioritized and applied promptly

## Best Practices for Users

1. **Keep your API keys secure**
   - Store OpenAI API keys in environment variables
   - Never share API keys in public repositories
   - Use separate API keys for development and production

2. **Validate input text**
   - Review text content before processing
   - Ensure you have rights to process the manuscript or story content

3. **Monitor usage**
   - Track API usage and set alerts if your provider supports them
   - Review generated outputs before distribution

4. **Keep software updated**
   - Regularly update Marvox to the latest version
   - Update Python dependencies as needed
   - Monitor security advisories

## Contact

If you have any questions about this security policy, please contact us through GitHub issues or security advisories.
