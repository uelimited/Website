"use client";

import { Maximize, Minimize, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HERO } from "@/data/firm";

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [videoFailed, setVideoFailed] = useState(false);

  const [fullscreenAvailable, setFullscreenAvailable] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const header = document.querySelector<HTMLElement>(".ue-header");
    if (!section || !header) return;

    function updateHeaderHeight() {
      section?.style.setProperty("--hero-header-height", `${header?.offsetHeight}px`);
    }

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setFullscreenAvailable(document.fullscreenEnabled === true);
    function syncFullscreen() {
      setFullscreen(document.fullscreenElement === cardRef.current);
    }
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  function toggleFullscreen() {
    const card = cardRef.current;
    if (!card) return;
    const action = document.fullscreenElement === card
      ? document.exitFullscreen()
      : card.requestFullscreen();
    void action.catch(() => {});
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;

    video.defaultMuted = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let resumePlayback = false;
    let wasVisible = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        if (wasVisible) resumePlayback = !video.paused;
        video.pause();
      } else if (resumePlayback || !reducedMotion.matches) {
        void video.play().catch(() => {});
      }
      wasVisible = entry.isIntersecting;
    });

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoFailed]);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    if (video.volume === 0) {
      video.volume = 1;
      video.muted = false;
    } else {
      video.muted = !video.muted;
    }
    if (!video.muted && video.paused) void video.play().catch(() => {});
  }

  function changeVolume(value: number) {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    if (!video.muted && video.paused) void video.play().catch(() => {});
  }

  return (
    <section ref={sectionRef} className="ue-hero-v2">
      <h1 className="sr-only">{HERO.title}</h1>
      <div ref={cardRef} className="ue-hero-v2__card">
        {videoFailed ? (
          <Image
            className="ue-hero-v2__image"
            src="/services/scaffold-silhouettes.jpg"
            alt=""
            fill
            sizes="100vw"
          />
        ) : (
          <video
            ref={videoRef}
            className="ue-hero-v2__image"
            src="/uel-homepage-hero.mp4"
            poster="/services/scaffold-silhouettes.jpg"
            muted={muted}
            loop
            playsInline
            preload="metadata"
            onVolumeChange={({ currentTarget }) => {
              setMuted(currentTarget.muted);
              setVolume(currentTarget.volume);
            }}
            onError={() => setVideoFailed(true)}
          />
        )}

        {!videoFailed && (
          <div className="ue-hero-v2__controls" role="group" aria-label="Hero video controls">
            <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"}>
              {muted ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={muted ? 0 : Math.round(volume * 100)}
              onChange={(event) => changeVolume(event.currentTarget.valueAsNumber / 100)}
              aria-label="Video volume"
            />
            {fullscreenAvailable && (
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={fullscreen ? "Exit full screen" : "Enter full screen"}
              >
                {fullscreen ? <Minimize size={18} aria-hidden /> : <Maximize size={18} aria-hidden />}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
