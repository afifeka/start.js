const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const dateformat = require('dateformat');
const datediff = require('date-diff')


const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setGame("PSIM 1969");
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#e56b00")
    .addField("Kicked User", `**${kUser}**`)
    .addField("Kicked By", `**<@${message.author.id}>**`)
    .addField("Reason", `${kReason}`);

    let kickChannel = message.guild.channels.find(`name`, "mod-logs");
    if(!kickChannel) return message.channel.send("Can't find **mod-logs** channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
	  
    message.delete().catch(O_o=>{});
    message.channel.send("Success kicked the player");

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#bc0000")
    .addField("Banned User", `**${bUser}**`)
    .addField("Banned By", `**<@${message.author.id}>**`)
    .addField("Reason", `**${bReason}**`);

    let incidentchannel = message.guild.channels.find(`name`, "mod-logs");
    if(!incidentchannel) return message.channel.send("Can't find **mod-logs** channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    message.delete().catch(O_o=>{});
    message.channel.send("Success banned the player");


    return;
  }
	
  if(cmd === `${prefix}unban`){
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    const reason = args.slice(1).join(' ');
    bot.unbanReason = reason;
    bot.unbanAuth = message.author;
    const user = args[0];
    const modlog = bot.channels.find('name', 'mod-logs');
    if (!modlog) return message.reply('I cannot find a mod-logs channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
    if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error);
    message.guild.unban(user);
    message.reply(`Successfuly unbanned <@${user}>`)
};
	
  if(cmd === `${prefix}ev`){
    if (message.author.id !== '401327121580032000') return;
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor("RANDOM")
        .addField('📥 Input', `\`\`\`js\n${codein}\`\`\``)
        .addField('📤 Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}


  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `**${rUser}**`)
    .addField("Reported By", `**${message.author}**`)
    .addField("Reason", `**${rreason}**`);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    message.channel.send("Success report this player");

    return;
  }
	
  if(cmd === `${prefix}warn`){
	
	let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!wUser) return message.channel.send("Can't find user!");
        let wReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be warned!");
  
  let wembed = new Discord.RichEmbed()
    .setDescription("Warned")
    .setColor("#e56b00")
    .addField("Warned User", `**${wUser}**`)
    .addField("Warned By", `**<@${message.author.id}>**`)
    .addField("Reason", `${wReason}`);
    
    let warnedChannel = message.guild.channels.find(`name`, "mod-logs");
    if(!warnedChannel) return message.channel.send("Can't find **mod-logs** channel.")
    
    message.delete().catch(O_o=>{});
    warnedChannel.send(wembed);
    message.channel.send("Success warned the player");

  return; 
}

  if(cmd === `${prefix}info`){
	
	message.channel.send(`

**Statistics**
\`\`\`
STATISTICS
• Mem Usage    : ${(process.memoryUsage().heapUsed / 1024 / 
1024).toFixed(2)} MB
• Swap Size    : ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
• Uptime       : ${bot.uptime}
• Users        : ${bot.users.size}
• Servers      : ${bot.guilds.size}
• Channels     : ${bot.channels.size}
• Discord.js   : v${Discord.version}
\`\`\``);
};
	
   if(cmd === `${prefix}scan`){
	 if(args[0] == "bot") {
	 	 var api_ms = (Math.round(bot.ping));
	 	
	 	 let botembed = new Discord.RichEmbed()
	 	 .setDescription(`Scanning Bot! \n Bot Name: ${bot.user.username} \n Speed Internet: ${api_ms}ms \n Created At: ${bot.user.createdAt}`);
	 	 message.channel.send(botembed)
    return;
  }
}
	
    if(cmd === `${prefix}feedback`){
	
	    
        message.delete().catch(O_o=>{});
	bot.users.get("401327121580032000").send(`${args[0]}`)
	
	return message.channel.send(`Thanks for your feedback/suggestion <@${message.author.id}>, Your Suggestion is in process!`)
	
	
   }

	



});

bot.login(process.env.BOT_TOKEN);
