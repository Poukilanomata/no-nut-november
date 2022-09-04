import award from '../styles/Awards.module.scss'
import Image from 'next/image'

function Top({img_url, title, day}) {
    return(
        <div className={award.title}>
            <Image src={img_url} alt='' className={award.image} height='30px' width='30px'/>
            <span>{title}</span>
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
            <span>30%</span>
            <span>2145 people</span>
        </div>
    )
}

export default function Award({
    img_url,
    title,
    content,
    day
}) {
    return(
        <div className={award.container}>
            <Top img_url={img_url} title={title} day={day}/>
            <Main content={content} />
            <Footer/>
        </div>
    )
}