const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = ("+");

client.login(process.env.BOT_TOKEN);

client.on('ready', function () {
    console.log('Bot Connected')
    client.user.setGame(`Kingdom System ( Prefix: + )`,"http://twitch.tv/Death Shop")
})

client.on('guildMemberAdd', member =>{
    member.guild.channels.get('605438284151128065').send(' **Hello** ' + member.user + ', **Welcome to Kingdom** , **We are now** ' + member.guild.memberCount + ' **Members** ! :heart:');
    console.log('+1');
});

/*kick*/
client.on('message', message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix +'kick'){
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("**Adak l7mar ! ** `You dont have the permission to use this command` ! :warning: ")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send(" `Please Mention an user` ! :warning: ")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("You do not have the permission to kick this member")
        if (!member.kickable) return message.channel.send(" `I can't kick this user` :warning: ")
        member.kick()
        message.channel.send(member.user.username+ ' `Has been kicked from the server, Bye` :o :warning: ')
    }
});


/*Ban*/
client.on('message', message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix +'ban'){
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("**Adak l7amr !** `You dont have the permission to use this command` :warning: ")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send(" `Please Mention an user` ! :warning: ")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("`You do not have the permission to Ban this member` :warning: ")
        if (!member.bannable) return message.channel.send(" `I can't Ban this user` :warning: ")
        message.guild.ban(member, {days : 7})
        message.channel.send(member.user.username+ ' `Has been Banned from the server, Bye` :o :warning: ')
    }
});

/*Clear*/ /*mute*/
client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix +"clear") {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Adak L7mar !** `You dont have the permission to use this command !` :warning: ")
        let count = args[1]
        if (!count) return message.channel.send(" `Please choose a number of messages to delete` :warning:")
        if (isNaN(count)) return message.channel.send(" `Please choose a number of messages to delete ` :warning: ")
        if (count <1 || count > 100) return message.channel.send("`Please choose a number from 1 to 100` :warning: ")
        message.channel.bulkDelete(parseInt(count) + 1)
    }

    if (args[0].toLowerCase() === prefix +"mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Adak L7mar !** `You dont have the permission to use this command !` :warning: ")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("`I can't find that Member ` :warning: ")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("` I can't Mute this user` :warning: ")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("`I can't Mute this Member` :warning: ")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + '`Has Been Muted` :warning: ')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + '`Has Been Muted` :warning: ')
            })
        }
    }

   

    /*Unmute */
    if(args[0].toLowerCase() === prefix + "unmute"){
        let member = message.mentions.members.first()
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Adak l7mar !** `You dont have the permission to use this command !` :warning: ")
        if(!member) return message.channel.send(" **I C'ant found this member** ")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("`You c'ant unmute this member.` :warning: ")
        if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id ===  message.guild.ownerID) return message.channel.send("`I c'ant unmute this member.` :warning: ")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
        message.channel.send(member + ' `Has been unmuted` :warning: ')
    }

    
});
