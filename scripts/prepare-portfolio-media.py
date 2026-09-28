"""Create portable web copies. Originals are never modified.
Usage: python3 scripts/prepare-portfolio-media.py '/path/to/sample videos'
Requires ffmpeg and ffprobe on PATH.
"""
import concurrent.futures, json, pathlib, subprocess, sys
source = pathlib.Path(sys.argv[1])
target = pathlib.Path(__file__).resolve().parents[1] / 'frontend/public/media/work'
target.mkdir(parents=True, exist_ok=True)
items = [
 ('motion-story','Recent Motion edit (1).mp4','Stories in motion','Motion & storytelling','short',5),
 ('ai-product','AI Product AD (UGC).mp4','A new kind of product film','AI product creative','ai',3),
 ('restaurant','Halloween & Kids Promotion 02 (1) (1).mp4','A little seasonal magic','Restaurant campaign','brand',6),
 ('skincare','Skin care 07 (1).mp4','Skincare, made personal','Beauty & UGC','short',3),
 ('west-coast','West coast electrical-ad2 (1).mp4','Local service. Lasting impact.','Service brand creative','brand',3),
 ('ai-ugc','ai-ugc-08 (1).mp4','An everyday story, reimagined','AI UGC','ai',3),
 ('parenting','Few things can trigger us more as parents than when our kids say they want to do an activity and.mp4','Small moments. Big feelings.','Educational short-form','short',3),
 ('new-year',"FFP (Dec 27) 2025 New Year's Page (1).mp4",'A fresh start','Social campaign','brand',3),
 ('bloc','BLOC GM Interview pt.1  (1) (1).mp4','The people behind the brand','Interview & storytelling','brand',15),
 ('real-estate','Real State 07 (2).mp4','More than a place','Real estate storytelling','short',6),
 ('arcads','15 seconds UGC style - Arcads video asset (2) (1).mp4','Straight to the point','AI UGC creative','ai',3),
 ('psp','PSP Video 03.mp4','Inside the story','Long-form edit','brand',10),
]
def process(item):
 slug,file,title,category,kind,start=item; p=source/file
 probe=json.loads(subprocess.check_output(['ffprobe','-v','quiet','-show_format','-show_streams','-of','json',str(p)]))
 v=next(s for s in probe['streams'] if s['codec_type']=='video'); duration=float(probe['format']['duration'])
 base=['ffmpeg','-hide_banner','-loglevel','error','-y','-threads','2']
 subprocess.run(base+['-ss',str(start),'-i',str(p),'-frames:v','1','-vf','scale=640:-2','-q:v','3',str(target/f'{slug}.jpg')],check=True)
 subprocess.run(base+['-ss',str(start),'-i',str(p),'-t','7','-an','-vf','scale=360:-2,fps=24','-c:v','libx264','-preset','fast','-crf','28','-pix_fmt','yuv420p','-movflags','+faststart',str(target/f'{slug}-preview.mp4')],check=True)
 subprocess.run(base+['-i',str(p),'-vf',"scale='min(720,iw)':-2",'-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',str(target/f'{slug}.mp4')],check=True)
 print('Prepared',slug,flush=True)
 return dict(id=slug,title=title,category=category,kind=kind,duration=f'{int(duration)//60}:{int(duration)%60:02}',landscape=v['width']>v['height'])
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: data=list(pool.map(process,items))
(pathlib.Path(__file__).resolve().parents[1]/'frontend/src/data/selectedWork.json').write_text(json.dumps(data,indent=2)+'\n')
