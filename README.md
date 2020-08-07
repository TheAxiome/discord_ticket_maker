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
    if (message.content.startsWith('!send')) {
        const channel = message.mentions.channels.first()
        const args = message.content.slice(5)

        ticket.msgTicketChannel(message, channel, args)//fixes coming soon, for this command
    }
    if (message.content.startsWith('!category')) {
        const ID = message.content.slice(9)//must be the category id
        ticket.Category(message, ID)

        message.channel.send(`Ticket Category has been set!`)
    }
    if (message.content.startsWith('!embed-message')) {
        const args = message.content.slice(14)

        ticket.editEmbed(message, args)
    }
    if(message.content.startsWith(`!add-user`)) {
        const channel = message.mentions.channels.first()
        const user = message.mentions.users.first()

        ticket.ticketAddUser(channel, user)
    }
    if (message.content === `!id`) {
        const ID = await ticket.fetchChanID(message)
        message.channel.send(`This channels id is ${ID}`)
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
Replace "channel" with the channel value, best not to change from example, unless you know discord.js
```


```
msgTicketChannel(channel, args)
```
```css
Note: this is very buggy at the moment, fixes coming soon!

Send a message to a ticket channel
Replace "channel" with your channel value
Replace "args" with your args value!
```


```
Category(message, ID)
```
```css
Set the ticket category

Replace "message" with your message value
Replace "ID" with the category id
```

```
editEmbed(message, args)
```
```css
Changes the first message, of the embed that is sent

Replace "message" with the message value
Replace "args" with the arguments or message you want to set
```

```
ticketAddUser(channel, user)
```
```css
Adds someone to a ticket channel

Replace "channel" with the channel value
Replace "user" with the user value, or person to add
```

```
fetchChanID(message)
```
```css
Fetches the current channels actual id, if the channel is a ticket channel

Replace "message" with your message value, for the channel
```

More values soon!
