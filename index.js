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
} else {
	if(args[0] == "user") {
		    let user = message.mentions.users.first() || message.author
let member = message.guild.member(user)
let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => `<@&${role.id}>`);
let messageauthor = message.guild.member(message.author)
let authorroles = message.guild.member(message.author).roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => `<@&${role.id}>`)

let joined = new datediff(Date.now(), member.joinedAt);
let created = new datediff(Date.now(), user.createdAt);

if (roles.length < 1) roles = ['None']
const status = {
   online: 'Online', 
   idle: 'Idle',
   dnd: 'Do Not Disturb',
   offline: 'Offline/Invisible'
 };
 let emoji;
 if (user.presence.status === "online") {
     emoji = "<:online:394179031655907358>"
 }
 if (user.presence.status === "dnd") {
     emoji = "<:dnd:394178900084916224>"
 }
 if (user.presence.status === "idle") {
     emoji = "<:idle:394178832082403340>"
 }
 if (user.presence.status === "offline") {
     emoji = "<:offline:394178762729848846>"
 }
 
 let game = user.presence.game && user.presence.game && user.presence.game.name
 if (!game) {
     game = "User is not playing a game"
 }
  let botuser; 
  if (member.user.bot === true) botuser = 'Yes'
  else botuser = 'No'
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  
  var authors = ["262410813254402048", "396027480097554432"]
      if (authors.includes(message.author.id && user.id)) {
                var lastmsg = user.lastMessage;
                if (lastmsg === undefined) {
                    lastmsg = "Has not said a message yet"
                }
        	let botuser;
  if (member.user.bot === true) botuser = 'Yes'
  else botuser = 'No'
	let embed = new Discord.RichEmbed()
	.setTitle("__Userinfo On The Owners!__ :prince:")
  .setColor("#ffd700")
  .setThumbnail(`${user.displayAvatarURL}`)
  .addField("***Username and Discriminator*** :name_badge:", `***>***__${user.tag}__`)
  .addField("***ID*** :id:", `***>***__${user.id}__`)
  .addField("***Created Account On*** <:added:394910274177597491>", `***>***__${dateformat(user.createdAt, "***mmmm dS, yyyy***, On a ***dddd***, ***h:MM:ss TT, Z***")}, that is **${Math.round(created.days())} days ago!**__`)
  .addField(`***Status*** ${emoji}`, `***>***__${status[user.presence.status]}__`, true)
  .addField("***Last Message*** :speech_left:", `***>***__${lastmsg}__`, true)
  .addField(`***Joined ${message.guild.name} On*** :heavy_plus_sign:`, `***>***__${dateformat(member.joinedAt, "***mmmm dS, yyyy***, On a ***dddd***, ***h:MM:ss TT, Z***")}, that is **${Math.round(joined.days())} days ago!**__`, true)
  .addField("***Playing*** :video_game:", `***>***__${game}__`, true)
  .addField("***Roles*** :scroll:", `***>***${roles.join(', ')}`, true)
  .addField("***Bot?*** :robot:", `***>***__${botuser}__`, true)
  message.channel.send({ embed: embed })
  return;
    }
    
  if (!user) {

  	
let embed = new Discord.RichEmbed()
.setTitle("**__Userinfo__**")
  .setColor(randomColor)
  .setThumbnail(`${message.author.displayAvatarURL}`)
  .addField("***Username and Discriminator*** <:added:394910274177597491>", `***>***__${message.author.tag}__`)
  .addField("***ID*** :id:", `***>***__${message.author.id}__`, true)
  .addField("***Created At*** <:added:394910274177597491>", `***>***${message.author.createdAt}`)
  .addField(`***Joined __${message.guild.name}__ On*** <:added_user:393802707267354645>`, `***>***__${messageauthor.joinedAt}__`)
  .addField("Status", `${status[message.author.presence.status]}`, true)
  .addField("Last Message", `${(lastmsg) || 'Has not said a message yet.'}`, true)
  .addField("Playing", `${(message.author.presence.game && message.author.presence.game && message.author.presence.game.name) || 'Not playing a game.'}`, true)
  .addField("Nickname", `${message.member.displayName}`, true)
  .addField("Roles", `${roles.join(', ')}`, true)
  .addField("Bot?", `${botuser}`, true)
  .addField("Wait", "Why is t")
message.channel.send({embed});
} else {
                    var lastmsg = user.lastMessage;
                if (lastmsg === undefined || lastmsg === null) {
                    lastmsg = "Has not said a message yet"
                }
	let botuser;
  if (member.user.bot === true) botuser = 'Yes'
  else botuser = 'No'
	let embed = new Discord.RichEmbed()
  .setColor(randomColor)
  .setThumbnail(`${user.displayAvatarURL}`)
  .addField("***Username and Discriminator*** :name_badge:", `***>***__${user.tag}__`)
  .addField("***ID*** :id:", `***>***__${user.id}__`)
  .addField("***Created Account On*** :heavy_plus_sign:", `***>***__${dateformat(user.createdAt, "***mmmm dS, yyyy***, On a ***dddd***, ***h:MM:ss TT, Z***")}, that is **${Math.round(created.days())} days ago!**__`)
  .addField(`***Status*** ${emoji}`, `***>***__${status[user.presence.status]}__`, true)
  .addField("***Last Message*** :speech_left:", `***>***__${lastmsg}__`, true)
  .addField(`***Joined ${message.guild.name} On*** :heavy_plus_sign:`, `***>***__${dateformat(member.joinedAt, "***mmmm dS, yyyy***, On a ***dddd***, ***h:MM:ss TT, Z***")}, that is **${Math.round(joined.days())} days ago!**__`, true)
  .addField("***Playing*** :video_game:", `***>***__${game}__`, true)
  .addField("***Roles*** :scroll:", `***>***${roles.join(', ')}`, true)
  .addField("***Bot?*** :robot:", `***>***__${botuser}__`, true)
message.channel.send({embed});
    }
}

	



});

bot.login(process.env.BOT_TOKEN);
