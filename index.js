const Discord = require("discord.js");
const bot = new Discord.Client();

const prefix = "~"; // Prefix easy to change
var nbrDansVoiceChannel = 0; // Should initiate with the number of user already in the voice channel
var timeMuted = 10000; // 10 seconds
var rdnMute = true; // Getting randomly muted on (false = off/true = on)
var userConnected = []; // Empty at the begenning, but should initiate like the nbrDansVoiceChannel
var minSec = 1.2e+6; // Minimum between each mute and this is like 20 minute in millisecond
var maxSec = 3.6e+6; // Maximun between each mute and this is like 1 hour in millisecond
var userNeeded = 2; // User needed for the mute

bot.on("ready", () =>{
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"+//clear the console
    "__________________________________________________________");//put a lign to separe different try
    console.log("I am ready!\n\n"); //Just to be sure
});

bot.on("message" , message => {
    if(message.author.bot) return; // Not responding his own message 
    if(!message.content.startsWith(prefix)) return; //Only read the messages with the prefix

    let command = message.content.split(" ")[0]; //First word is the command
    command = command.slice(prefix.length); //And remove the prefix, to easily change the prefix is needed

    let args = message.content.split(" ").slice(1);//Create an array with the args

    //Wall of text for the commands
    if(command === "help" || command === "commands" || command ==="command"){
        message.reply(  '\n~say sentence                        Make me say something'+ 
                        '\n~gay                                 Say to everybody online that you are gay'+ 
                        '\n~random number                       Random number between 0 and the number wrote'+ 
                        '\n~avatar somebody                     A url for his/her/it avatar'+
                        '\n~REEEE                               REEEEE GET THE FUCK OUT OF MY CHANNEL'+
                        '\n~cat                                 Random image of a cat'+
                        '\n~rdnMute On/Off                      Set the random mute on/off'+
                        '\n~timeMute seconds(max 120)           Number of seconds for the random mute'+
                        '\n~interval min(sec) max(sec)          Number of seconds between each random mute'+
                        '\n~setNumber                           Set the number of user needed for a random mute'+
                        '\n~stat                                Important stat for a mute'+ 
                        '\n~help or ~commands                   I show you all my commands');
    } else

    // Make the bot say something, need more work(ex. Deleting the message with the ~say)
    if(command === "say"){
        message.channel.sendMessage(args.join(" "));
    } else

    // Fucking useless command
    if(command === "gay"){
        message.channel.sendMessage("@here " + message.author + ' est gay!');
    } else

    // Just a random number from an interval
    if(command === "random"){
        if(!isNaN(args)){
            rdn = randomIntFromInterval(0,args);
            message.reply(rdn);
            }
        else{
            message.reply("It's not a number, baka!");
            }
    } else

    //Show the avatar of the user or the one of an other user
    if(command === "avatar") {
        if(message.mentions.users.size === 0){ //If there is no argss
            message.reply(message.author.avatarURL);
        }
        else{
            message.reply(message.mentions.users.first().avatarURL);
        }
    } else

    //REEEEEEEEEEEEEE
    if(command === "REEEE") {
        message.channel.sendFile("./image/b49.gif",null);
    } else

    //Random image of a cat
    if(command === "cat" || command === "cats" || command === "Cat" || command === "Cats" ) {
        var imageID = randomIntFromInterval(1,100);
        message.channel.sendMessage("Sending an image of a cat, it may take few seconds...");
        message.channel.sendFile("./image/cats_cats_"+imageID+".jpg",null);
    } else

    // How much time the mute will be
    if(command === "TimeMute" || command === "timeMute" || command === "Timemute" || command === "timemute"){
        if(isNaN(args)){
            message.reply("Do you know what a number is? Idiot");
        } else

        if(args >= 121){
            message.reply("It's a bit much, don't you think?");
            }
        else{
             timeMuted = (args*1000);
             message.reply("The next time the user will be muted "+ (timeMuted/1000)+" seconds");
        }
    } else

    // On/off of the random mute
    if(command === "rdnMute" || command === "rdnmute" || command === "Rdnmute" || command === "RdnMute"){
        if(args == 'on' || args == 'On'){
            rdnMute = true;
            message.reply("We will have fun :^)");
            }else

            if(args == 'off' || args == 'Off'){
                rdnMute = false;
                message.reply("You're scared its gonna be you " + message.author.username + " >:(");
                }

            else{
                message.reply("What do you think you're doing ?");
            }
        } else

        //The interval between his random mute
        if(command === "interval" || command === "Interval"){

            if(isNaN(args[0]) || isNaN(args[1])){
                message.reply("You know what is a number, r-right?")
            }else

            if(args[1] >= 86400){ // 86400 is a day in seconds
                message.reply("A maximum of a day between random mute is a bit much !");
            }else

            if(args[0] >= args[1]){ // If min < max then something will go wrong
                message.reply("The max should have more time then the min");
            }else

            if(args[0] <= 0 || args[1] <= 0){ // The reply makes it obvious
                message.reply("Can't have negative time, stupid!");
            }

            else{
                message.channel.sendMessage(message.author.username + " has set the interval of mute between " +
                args[0] + " seconds and " + args[1] + " seconds, or between " + (args[0]/60) + " and " + (args[1]/60) + " minutes");
                minSec = (args[0]*1000);//The *1000 is to put it in millisecond
                maxSec = (args[1]*1000);//Same here
            }
        }else

        // Let the users set the number of user needed for a random mute
        if(command === "setNumber" || command === "setnumber" || command === "SetNumber" || command === "Setnumber"){
        if(isNaN(args)){
            message.reply("Must be a number, slowpoke!");
        } else

        if(args >= message.guild.memberCount){
            message.reply("Not enought user in your server, fking pleb");
            }
        else{
             userNeeded = (args);
             message.reply("You should have at least "+ userNeeded+" to have a random mute");
            }
        } else 
        
        //stats for the random mute
        if (command === "stat"){
                message.reply(  "\n Users connected to the voice chat : " + nbrDansVoiceChannel +
                                "\n Minimum of seconds before the next random mute : " + minSec*1000 + 
                                "\n Maximum of seconds before the next random mute : " + maxSec*1000 + 
                                "\n The random mute is on : " + rdnMute + 
                                "\n Duration of the next random mute : " + (timeMuted/1000) +
                                "\n Number of user needed for a random mute : " + userNeeded);
    }

    else{
        message.reply("You might want to use ~help next time");
        return;
    }

});

bot.on("voiceStateUpdate", function(newMember, oldMember) {
        
        //If the person disconnected
        if(newMember.voiceChannel != undefined){
                
                if(newMember.mute == oldMember.mute){
                    if(nbrDansVoiceChannel >= 1){
                        
                        nbrDansVoiceChannel--;
                    }

                    console.log(newMember.user + " aka " + newMember.user.username +" disconnected from " +
                    newMember.voiceChannel.name + " the " + getDateTime());

                    userConnected = userConnected.filter(checkUser);
                
                    function checkUser(name){
                        return name != newMember.user;
                    }
            }
        }
        //If the user just connected
        //If i don't do this being muted call the update back
        else if(!newMember.mute){
            nbrDansVoiceChannel++;

            console.log(newMember.user+" aka " + newMember.user.username + "joined " + newMember.guild.name + " the " + getDateTime());
            
            userConnected.push(newMember.user);

            //If there two user in the voice channel and the random mute is on
            if(nbrDansVoiceChannel >= 2 && rdnMute == true){

                    var timeBetweenMute = randomIntFromInterval(minSec,maxSec);
                    //Just to know
                    console.log("Mute incomming in " + (timeBetweenMute/1000) + " seconds");
                    //The id of somebody random connected in a voice channel and in the same guild of the last user
                    var userMuted = newMember.guild.member(userConnected[randomIntFromInterval(0,(userConnected.length -1))]);

                    setTimeout(function() {
                        userMuted.setMute(true);
                        userMuted.user.sendMessage("You have been muted for " + (timeMuted/1000) + " seconds");

                        //This timeout is for the time before the user is unmuted
                        setTimeout(function() {
                            userMuted.setMute(false);
                        }, timeMuted);

                    }, timeBetweenMute);
                }

            else{
                    return;} // just in case something goes wrong
        }
});

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + " at " + hour + ":" + min + ":" + sec;

}

bot.login('MjYyNDIwMTIyMTkzMzYyOTQ0.C0DNTA.pGAmqcgo363ol9l9BkeI6tzl7Uo');