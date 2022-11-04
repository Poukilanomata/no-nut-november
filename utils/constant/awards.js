//images
import Soldier from '../../public/images/soldier.png'
import Adjudant from '../../public/images/adjutant.png'
import Lieutenant from '../../public/images/lieutenant.png'
import Colonel from '../../public/images/colonel.png'
import King from '../../public/images/king.png'
import Emperor from '../../public/images/emperor.png'
import Sensei from '../../public/images/sensei.png'
import Master from '../../public/images/master.png'
import Jedi from '../../public/images/jedi.png'
import JediMaster from '../../public/images/jedi master.png'
import SorcererSupreme from '../../public/images/sorcerer supreme.png'
import Colossus from '../../public/images/colossus.png'
import Hercules from '../../public/images/hercules.png'
import Buddha from '../../public/images/buddha.png'

const awards =  {
    'Soldier': {
        image: Soldier,
        day: 0,
        description: "Welcome Soldier ! Your objective is simple: to resist. \nA long journey awaits you where you will have to resist for at least a month or more for the most valorous. \nAny failure during this month will not be accepted or you will be considered as a outcast from society! \nMay the force be with you."
    },

    'Adjudant': {
        image: Adjudant,
        day: 3,
        description: "You've been promoted to adjutant! \nI shouldn't really congratulate you on passing this grade. Don't forget that you have many days left so don't rest on your laurels! \nKeep up the good work!"
    },

    'Lieutenant': {
        image: Lieutenant,
        day: 6,
        description: "You've been promoted to lieutenant! \nOne week has now passed. You are one of the 45% of men who have not touched themself for a week. Not bad for a newbie but not enough to make it to 'Suprem leader'. \nSo what are you doing? Why aren't you doing anything? Come on, train and hurry up!"
    },

    'Colonel': {
        image: Colonel,
        day: 9,
        description: "You've been promoted to colonel! \nYou've been holding out for nine days now. \nThat's a higher rank than the lieutenant rank you got after 6 days .... By the way, 9 days, 6 days... 9 6 .... 69 ....... ( ͡° ͜ʖ ͡°). Anyway, keep it up!"
    },

    'King': {
        image: King,
        day: 12,
        description: "You've been promoted to King! \nIt's been 10 days that you're holding your position. \nAll the kingdom is proud of you. Watch your progression, it's amazing, you may take a little break ... NOOOO !! It was a test. Don't give up, the hardest part is yet to come ..."
    },

    'Emperor': {
        image: Emperor,
        day: 15,
        description: "You've been promoted to Emperor! \nTwo long weeks has now passed. \nIt's about to be serious, you've done half the part ! Tentation is strong but emperors are stronger, keep this in mind."
    },

    'Sensei': {
        image: Sensei,
        day: 18,
        description: "You've been promoted to Sensei! \nDon't you feel that something is different... Yes... An aura of wisdom surrounds you Sensei. It's BIG BRAIN TIME !"
    },

    'Padawan': {
        image: Master,
        day: 21,
        description: "YYou have been promoted to Padawan!\nAfter completing your training among the monks, your newfound ambition has driven you to join the Jedi order, and you're learning with the best"
    },

    'Jedi': {
        image: Jedi,
        day: 24,
        description: "You have been promoted to Jedi knight!\nYou've received the title of Jedi Knight after completing your training, Yoda was impressed by your progression (and you finally don't have that crappy haircut anymore).Congratulations !"
    },

    'Jedi Master': {
        image: JediMaster,
        day: 30,
        description: "You have been promoted to Jedi Master!\nAfter fighting against the Fap Side of the Force for 30 days, you now find yourself helping others start their journey, and are an example others look up to."
    },

    'Sorcerer Supreme': {
        image: SorcererSupreme,
        day: 50,
        description: "You have been promoted to Sorcerer Supreme! \nYou've become the Sorcerer Supreme instead of Doctor Strange because of your incredible inner strenght and patience, so strong that people start to believe you're not from this world. Even Captain America is more horny than you. You now are a hero helping the universe."
    },

    'Colossus': {
        image: Colossus,
        day: 80,
        description: "You have been promoted to Colossus!\nAfter defeating all enemies in your universe, you have become a legend known as Colossus, the man with balls of steel. New achievement : You have become a legend."
    },

    'Hercules': {
        image: Hercules,
        day: 110,
        description: "You have been promoted to Hercules!\nPeople have started to compare you as Hercules as you have overcome all the trials of the universe and remain humble. You've starting to travel to others universe to help others become legends."
    },

    'Buddha': {
        image: Buddha,
        day: 180,
        description: "You have been promoted to Buddha!\nAlthough entire planets started praying you as a god, you remind them that 6 monts ago you were a mere fapper, with  no motivation or self-esteem, and that you've simply done what others could also do. You inspire people all across the multiverse as a symbol of humility and success. This is it, you've reach the summit of self-awareness, and you have become the wisest person. I still want to ask : are you okay man ?"
    }
}

// Thanks to @Gasrod and @Rogue for their creativity !

export default awards