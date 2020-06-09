export function displayNotification(title, body) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            const options = {
                body,
                icon: './media/icons/hva-logo-purple.svg',
                vibrate: [100, 50, 100],
                data: {
                    timestamp: Date.now()
                },
                actions: [{
                        action: 'goto',
                        title: 'Go to HvA Portal',
                        icon: './media/icons/hva-logo-purple.svg'
                    },
                    {
                        action: 'close',
                        title: 'Close notification',
                        icon: './media/icons/hva-logo-purple.svg'
                    },
                ]
            }
            reg.showNotification(title, options)
        })
    }
}