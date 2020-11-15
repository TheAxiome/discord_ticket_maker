const db = require('quick.db')

class DiscordTicket {

    async setRole(message, role) {

        let content = {
            embed: {
              color: "#00ff00",
              title: ":white_check_mark: | Ticket Role Set",
              description: `Ticket role has been successfully set to ${role}. This is the role which will be pinged whenever a ticket is made.`
            }
          };

        message.channel.send(content)
        
        db.delete(`ticketRole_${message.guild.id}`)
        db.set(`ticketRole_${message.guild.id}`, role)

    }

    async resetRole(message) {
        db.delete(`ticketRole_${message.guild.id}`)
    }

    async editEmbed(message, input) {
        if (!input) {
            db.delete(`ticEmbed_${message.guild.id}`)
            db.set(`ticEmbed_${message.guild.id}`, "Support will be here shortly.\nThe support team has been notified!")
            const msge = await db.fetch(`ticEmbed_${message.guild.id}`)

            message.channel.send(":white_check_maek: | The embed message was successfully set to `" + msge + "`")
        } else {
            db.delete(`ticEmbed_${message.guild.id}`)
            db.set(`ticEmbed_${message.guild.id}`, input)

            message.channel.send(":white_check_mark: | The embed message was successfully set to `" + input + "`")

        }
    }

    async Category(message, ID,) {
        db.delete(`ticCategory_${message.guild.id}`)
        db.set(`ticCategory_${message.guild.id}`, ID)

     message.channel.send(`: white_check_mark: | Successfully set the category to <#${ID}>`)
    }

    async makeTicket(message, reason, options) {
        const category = await db.fetch(`ticCategory_${message.guild.id}`)
        const ot = await db.fetch(`ticID_${message.author.id}`)
        const ticketRole = await db.fetch(`ticketRole_${message.guild.id}`)
        let embedmsg = await db.fetch(`ticEmbed_${message.guild.id}`)
        if(!embedmsg) embedmsg = "Please wait until the support team is here. They have been notified!"
        const exEmbed = await db.fetch(`exEmbed_${message.guild.id}`)

        if (message.guild.channels.cache.find(c => c.id == ot)) {
            const channel = message.guild.channels.cache.find(c => c.id == ot)
            let content = {
                embed: {
                  color: "#ff0000",
                  title: "❌ | You already have a ticket open!",
                  description: `You already have ${channel} open! Make sure to close it to create another.`
                }
            }
        message.reply(content)
        } else {
            db.add(`ticketNumber_${message.guild.id}`, 1)

            const ticNum = await db.fetch(`ticketNumber_${message.guild.id}`)
            const ticName = `Ticket-${ticNum}`

            message.guild.channels.create(ticName).then(chan => {
                db.set(`ticID_${message.author.id}`, chan.id)
                db.set(`open_${chan.id}`, "open")
                db.set(`chanID_${chan.id}`, chan.id)

                chan.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false,
                    VIEW_CHANNEL: false,
                    READ_MESSAGES: false
                })
                chan.updateOverwrite(message.author.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                    READ_MESSAGES: true
                })

                let content = {
                    embed: {
                      color: "#00ff00",
                      title: `${message.author.tag} has created a ticket with the reason - ${reason}.\nTicket ID - ${ticNum}`,
                      description: `${embedmsg}`
                    }
                }

                let content2 = {
                    embed: {
                      color: "#00ff00",
                      title: ":white_check_mark: | Ticket Created",
                      description: `Ticket ${chan} has been created for you.`
                    }
                }

                if (ticketRole) {
                    chan.updateOverwrite(ticketRole.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true
                    })
                    const ROLE = chan.guild.roles.cache.find(r => r.id == ticketRole.id || r.name == ticketRole.name)
                if (ROLE) {    
                    chan.send(`${ROLE}`, content)
                    } 
                } else {
                    chan.send(content)
                }

                if (options) {
                    message.author.send(content2)
                    message.react('✅')
                } else {
                    message.channel.send(content2)
                }


                if (!category) {
                    return;
                } else {
                    chan.setParent(category)
                }

                
            })
        }

    }

    async closeTicket(message, channel) {

        const ot = await db.fetch(`open_${channel.id}`)

        if (ot === "open") {
            channel.delete()

            message.author.send(`:white_check_mark: | Ticket - ${channel.name} has been successfully closed!`)
        } else {
            return;
        }

    }

    async msgTicketChannel(channel, args) {

        const ot = await db.fetch(`open_${channel.id}`)

        if (ot === "open") {
            let content = {
                embed: {
                    description: `${args}`
                }
            }

            channel.send(content)
        } else {
            return;
        }
    }

    async ticketAddUser(channel, user) {

        const ot = await db.fetch(`open_${channel.id}`)

        if (ot === "open") {
            channel.updateOverwrite(user.id, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
                VIEW_CHANNEL: true
            })
    
            let content = {
                embed: {
                    color: "GREEN",
                    title: `New Member`,
                    description: `${user} has been added to the ticket!`
                }
            }
            channel.send(content)
        } else {
            return;
        }
    }

    async addEmbed(message, input) {
        db.delete(`exEmbed_${message.guild.id}`)
        db.set(`exEmbed_${message.guild.id}`, input)
    }

    async fetchChanID(message) {
        const ID = await db.fetch(`chanID_${message.channel.id}`)

        return ID;
    }
 
     async ticketRemoveUser(channel, user) {

        const ot = await db.fetch(`open_${channel.id}`)

        if (ot === "open") {

            channel.updateOverwrite(user.id, {

                SEND_MESSAGES: false,

                READ_MESSAGES: false,

                VIEW_CHANNEL: false

            })

    

            let content = {

                embed: {

                    color: "GREEN",

                    title: `Removed Member!`,

                    description: `${user} has been removed from this ticket!`

                }

            }

            channel.send(content)

        } else {

            return;

        }

    }
}

module.exports = DiscordTicket;
