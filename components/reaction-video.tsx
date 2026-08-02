'use client';

import {useEffect,useRef} from 'react';

export function ReactionVideo({src,poster,label}:{src:string;poster:string;label:string}){
  const ref=useRef<HTMLVideoElement>(null);
  useEffect(()=>{
    const video=ref.current;
    if(!video)return;
    const prepare=()=>{
      video.playbackRate=1.25;
      if(video.duration>6&&video.currentTime<1)video.currentTime=1;
      void video.play().catch(()=>{});
    };
    video.addEventListener('loadedmetadata',prepare);
    prepare();
    return()=>video.removeEventListener('loadedmetadata',prepare);
  },[]);
  return <figure className="reaction-video">
    <video ref={ref} src={src} poster={poster} autoPlay muted loop playsInline preload="metadata"/>
    <figcaption><span className="reaction-live">● Истинска реакция</span><b>{label}</b><small>Видеото е леко ускорено, за да видите най-хубавия момент.</small></figcaption>
  </figure>;
}
