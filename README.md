# PWA Notification


Implementation: Design a server API that, when called, displays the notifications the web app has subscribed to. It should work on mobile devices with a PWA.

## Tips

- Thanks for this awesome tutorial: https://www.youtube.com/watch?v=oDIYl3G613E
- `Notification.requestPermission` needs to use HTTPS when used in a PWA. You can use nginx to proxy the frontend and backend, then use ngrok to enable HTTPS for testing purposes.

```
brew install nginx
```

