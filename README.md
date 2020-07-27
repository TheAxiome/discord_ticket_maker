# Info

[Create support tickets discord.js with low effort!](https://www.npmjs.com/package/discord_ticket_maker)

[Here is a list of all the npms I have created!](https://github.com/TheAxiome/NPM-List)

# Useful Links

- [Github issue board](https://github.com/TheAxiome/discord_ticket_maker/issues)

- [Go to the npm issues channel in my discord server](https://discord.gg/ZbKVPY5), or contact me **axiome#0441** on discord

# How to use

`npm i discord_ticket_maker`

```javaScript
const Discord = require('discord.js')
const client = new Discord.Client()

const { DiscordTicket } = require('discord_ticket_maker')
const ticket = new DiscordTicket()

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`)
})

client.on('message', async message => {
    if (message.content.startsWith('!t-role')) {
        const role = message.mentions.roles.first()

        ticket.setRole(message, role) //Set the support role, that gets pinged when a new ticket is created!
    }

    if (message.content.startsWith('!ticket')) {
        const reason = message.content.slice(7)

        ticket.makeTicket(message, reason)//Creates a new ticket, the reason is optional!
    }

    if (message.content.startsWith('!close')) {
        const args = message.content.slice(6)
        const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id == args || c.name == args) || message.channel

        ticket.closeTicket(message, channel)
    }
})

client.login('TOKEN')
```

# Values/Syntax

**if you are unsure of what values to change, or do not understand, copy from the example above!**

```
setRole(message, role)
```
```css
This sets the role that gets pinged every time a support ticket is created!

Replace "message" with your message value
Replace "role" with the role mention, or value
```



```
makeTicket(message, reason)
```
```css
This creates a new support ticket in a guild

Replace "message" with your message value
Replace "reason" with your reason args value, reasons are optional!
```



```
closeTicket(message, channel)
```
```css
This closes a support ticket, even if the ticket's name was changed

Replace "message" with your message value
Replace "channel" with the channel value, best not to change from example, unless you are know discord.js
```

More values soon!
