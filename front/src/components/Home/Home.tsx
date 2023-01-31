import Link from 'next/link'
import style  from "../../assets/style/video.module.css";
const Home = () => {
return (
<><title>La Dionisia - Wines</title>
<div className={style.videodiv}>
<h1 className={style.videoh1}>Wine at its best</h1>
</div>
<Link href="/home"><a className={style.videobutton}>enter</a></Link>
<div className={style.video}>
<video className={style.videotag} autoPlay loop muted><source src="assets/video.mp4" type="video/mp4"/>
Video is playing, trees are seen, a car on a road, people setting a table, wine glasses, wine barrel, chef preparing picnic, waitresses serving wine,
people having lunch in country place.
</video>
</div>
<div className={style.videoribbon}>
  <img className={style.videologo} src="assets/logo.svg"/> 
</div>
</>)
}; export default Home;