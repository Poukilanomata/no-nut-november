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

    'Master': {
        image: Master,
        day: 21,
        description: "You've been promoted to Master! \nBravo ... really bravo ... 21 days, you deserve your master rank. After resisting for so long you should have developed some skills that will help you with the women .... No ? That means you're getting sloppy! Come on, 3 laps of the field and faster than that!"
    },

    'Jedi': {
        image: Jedi,
        day: 24,
        description: "You've been promoted to Jedi ! \nHaving become a Jedi, you now wield your sword like no other and you must stand up to the Empire as it will strike back. But do not weaken, you only have a few days left to achieve your goal!"
    },
}

export default awards