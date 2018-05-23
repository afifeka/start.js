const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
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

    let kickChannel = message.guild.channels.find(`name`, "public-logs");
    if(!kickChannel) return message.channel.send("Can't find channel.");

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

    let incidentchannel = message.guild.channels.find(`name`, "public-logs");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    message.delete().catch(O_o=>{});
    message.channel.send("Success banned the player");


    return;
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
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  
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



});

bot.login(process.env.BOT_TOKEN);
