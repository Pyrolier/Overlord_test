const Discord = require("discord.js");
const bot = new Discord.Client();

const prefix = "~";
var nbrDansVoiceChannel = 0;

bot.on("ready", () =>{
    console.log("I am ready!\n\n\n");
});

bot.on("message" , message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    if(command === "help" || command === "commands" || command ==="command"){
        message.reply(  '\n~say sentence                        Make me say something                                        '+ 
                        '\n~gay                                 Say to everybody online that you are gay                     '+ 
                        '\n~random number                       Random number between 0 and the number wrote                 '+ 
                        '\n~avatar somebody                     A url for his/her/it avatar                                  '+
                        '\n~REEEE                                REEEEE GET THE FUCK OUT OF MY CHANNEL                        '+
                        '\n~cat                                 Random image of a cat                                        '+ 
                        '\n~help or ~commands                   I show you all my commands                                   ');
    } else
    if(command === "say"){
        message.channel.sendMessage(args.join(" "));
    } else
    if(command === "gay"){
        message.channel.sendMessage("@here " + message.author + ' est gay!');
    } else
    if(command === "random"){
        if(!isNaN(args)){
        rdn = randomIntFromInterval(0,args);
        message.reply(rdn);
        }
        else{
            message.reply("It's not a number, baka!");
        }
    } else
    if(command === "avatar") {
        if(message.mentions.users.size === 0){
            message.reply(message.author.avatarURL);
        }
        else{
            message.reply(message.mentions.users.first().avatarURL);
        }
    } else
    if(command === "REEEE") {
        message.channel.sendFile("b49.gif",null);
    }else
    if(command === "cat" || command === "cats" || command === "Cat" ) {
        var imageID = randomIntFromInterval(1,100);
        message.channel.sendMessage("Sending an image of a cat, it may take few seconds...");
        message.channel.sendFile("./image/cats_cats_"+imageID+".jpg",null);
    }
    //Commande temporaire
    else if(command === "nbrCompteur") {
        console.log(nbrDansVoiceChannel);
    }
    else{
        return;
    }
});

bot.on("voiceStateUpdate", (guildMember) => {
        if(guildMember.voiceChannel != undefined){
            if(nbrDansVoiceChannel >= 1){
            nbrDansVoiceChannel--;}
            console.log(guildMember.user.username + " s'est deconnecte de " +
            guildMember.voiceChannel.name);
        }
        else{
            nbrDansVoiceChannel++;
            console.log(guildMember.user.username + " s'est connecte!");
        }
        //console.log(nbrDansVoiceChannel);
});

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

bot.login('MjYyNDIwMTIyMTkzMzYyOTQ0.C0DNTA.pGAmqcgo363ol9l9BkeI6tzl7Uo');