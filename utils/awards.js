import award from '../styles/Awards.module.scss'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/authSlice'

function Top({img_url, title, day}) {
    return(
        <div className={award.title}>
            <Image src={img_url} alt='' className={award.image} height='30px' width='30px'/>
            <span>{title}  </span>
            <span className={award.day}>{'Day ' + day}</span>
        </div>
    )
}

function Main({content}) {
    return(
        <div className={award.main}>
            {content}
        </div>
    )
}

function Footer(props) {
    return(
        <div className={award.footer}>
            <span>- %</span>
            <span>- people</span>
        </div>
    )
}

export default function Award({
    img_url,
    title,
    content,
    day
}) {
    let user = useSelector(selectUser)
    return(
        <div className={`${award.container} ${user?.awards.includes(title)? award.with : award.without}`}>
            <Top img_url={img_url} title={title} day={day}/>
            <Main content={content} />
            <Footer />
        </div>
    )
}

/*
export async function getStaticProps() {
    await connectMongo()
    var awards_stat = {}
    let tt_users = await Account.countDocuments({})
    
    for (const k in awards) {
        if (awards.hasOwnProperty.call(awards, k)) {
            const a = awards[k]
            const number = await Account.countDocuments({
                awards: {
                    $elemMatch: {
                        a
                    }
                }
            })

            awards_stat[k] = {
                'percentage': Math.floor(number*100/tt_users),
                'number': number
            }
        }
    }
    
    return{
        props: {
            tt_users,
            awards_stat
        },
        
        revalidate: 60
    }
}*/