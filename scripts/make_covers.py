# Generates illustrated placeholder covers + phone screens into public/covers (replace with real ones via /admin)
import textwrap
F = "Georgia, 'Times New Roman', serif"
HEART = "M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2.1 0 3.8 1.2 5.6 3.3 1.8-2.1 3.5-3.3 5.6-3.3 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z"
SPARK = "M12 0c.8 6.6 3.4 9.2 12 12-8.6 2.8-11.2 5.4-12 12-.8-6.6-3.4-9.2-12-12C8.6 9.2 11.2 6.6 12 0z"

def heart(x,y,s,c,o=1,r=0): return f'<path transform="translate({x} {y}) rotate({r}) scale({s}) translate(-12 -12)" d="{HEART}" fill="{c}" opacity="{o}"/>'
def spark(x,y,s,c="#FFD56B",o=1): return f'<path transform="translate({x} {y}) scale({s}) translate(-12 -12)" d="{SPARK}" fill="{c}" opacity="{o}"/>'
def circ(x,y,r,c,o=1): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}" opacity="{o}"/>'
def flower(cx,cy,r,c1,c2="#FFD56B",n=6,rot=0):
    g=f'<g transform="translate({cx} {cy}) rotate({rot})">'
    for i in range(n): g+=f'<ellipse cx="0" cy="{-r*.62}" rx="{r*.32}" ry="{r*.62}" fill="{c1}" opacity=".93" transform="rotate({i*360/n})"/>'
    return g+f'<circle r="{r*.2}" fill="{c2}"/></g>'
def leaf(x,y,s,rot,c): return f'<path transform="translate({x} {y}) rotate({rot}) scale({s})" d="M0 0C-22 -30 -12 -70 0 -92C12 -70 22 -30 0 0Z" fill="{c}"/>'

def cake(cx,cy,s,acc):
    g=f'<g transform="translate({cx} {cy}) scale({s})" filter="url(#sh)">'
    g+='<ellipse cx="0" cy="88" rx="115" ry="14" fill="#fff" opacity=".8"/>'
    g+='<rect x="-92" y="18" width="184" height="66" rx="16" fill="#fff"/>'
    g+=f'<rect x="-66" y="-34" width="132" height="56" rx="14" fill="{acc}"/>'
    g+='<rect x="-40" y="-74" width="80" height="44" rx="12" fill="#fff"/>'
    g+=f'<path d="M-92 40q15 18 30 0t30 0 30 0 30 0 30 0 30 0" fill="none" stroke="{acc}" stroke-width="7" stroke-linecap="round"/>'
    for x in (-20,0,20):
        g+=f'<rect x="{x-3}" y="-108" width="6" height="36" rx="3" fill="#FFD56B"/><ellipse cx="{x}" cy="-118" rx="6" ry="10" fill="#FF9F43"/><ellipse cx="{x}" cy="-116" rx="3" ry="5" fill="#FFE9A8"/>'
    return g+'</g>'
def diya(cx,cy,s):
    g=f'<g transform="translate({cx} {cy}) scale({s})">'
    g+='<circle cx="0" cy="-40" r="130" fill="url(#glow)"/>'
    g+='<path d="M-85 0Q0 96 85 0Q0 26 -85 0Z" fill="#D9A441"/><ellipse cx="0" cy="0" rx="85" ry="13" fill="#F2C766"/>'
    g+='<path d="M0 -8C-26 -42 -8 -82 0 -108C8 -82 26 -42 0 -8Z" fill="#FF9F43"/><path d="M0 -10C-12 -32 -4 -52 0 -66C4 -52 12 -32 0 -10Z" fill="#FFE9A8"/>'
    return g+'</g>'
def ring(cx,cy,s):
    return (f'<g transform="translate({cx} {cy}) scale({s})" filter="url(#sh)"><circle r="52" fill="none" stroke="#D9A441" stroke-width="13"/>'
            '<polygon points="0,-112 26,-84 0,-56 -26,-84" fill="#E9D5FF" stroke="#fff" stroke-width="4"/><polygon points="0,-112 0,-56 -26,-84" fill="#fff" opacity=".5"/></g>')
def rakhi(cx,cy,s,acc):
    g=f'<g transform="translate({cx} {cy}) scale({s})" filter="url(#sh)"><circle r="78" fill="none" stroke="{acc}" stroke-width="6" stroke-dasharray="2 12" stroke-linecap="round"/>'
    for i in range(12):
        import math; a=i*math.pi/6; g+=f'<circle cx="{78*math.cos(a):.1f}" cy="{78*math.sin(a):.1f}" r="8" fill="{["#FFD56B","#FF7A7A","#fff"][i%3]}"/>'
    return g+flower(0,0,50,acc,"#FFD56B",8)+'</g>'
def polaroid(x,y,w,rot,tone,h=None):
    h=h or w*1.2
    return (f'<g transform="translate({x} {y}) rotate({rot})" filter="url(#sh)"><rect x="{-w/2}" y="{-h/2}" width="{w}" height="{h}" rx="8" fill="#fff"/>'
            f'<rect x="{-w/2+10}" y="{-h/2+10}" width="{w-20}" height="{h-40}" rx="4" fill="{tone}"/>'+heart(0,-h/2+10+(h-40)/2,w/60,"#fff",.85)+'</g>')
def bigheart(cx,cy,s,acc): return f'<g filter="url(#sh)">{heart(cx,cy,s,acc)}</g>'+spark(cx+s*9,cy-s*10,s*.6)
def timeline(cx,cy,s,acc):
    g=f'<g transform="translate({cx} {cy}) scale({s})" filter="url(#sh)"><rect x="-110" y="-4" width="220" height="8" rx="4" fill="#fff"/>'
    for i,x in enumerate((-100,-33,33,100)):
        g+=circ(x,0,15,acc if i%2 else "#fff")+f'<rect x="{x-24}" y="{-70 if i%2 else 28}" width="48" height="42" rx="7" fill="#fff"/>'+heart(x,(-49 if i%2 else 49),1,"#FF7A7A",.8)
    return g+'</g>'
def motif(name,cx,cy,s,acc):
    return {"cake":lambda:cake(cx,cy,s,acc),"diya":lambda:diya(cx,cy,s),"ring":lambda:ring(cx,cy,s),"rakhi":lambda:rakhi(cx,cy,s,acc),
            "polaroids":lambda:polaroid(cx-60*s,cy+10*s,110*s,-9,"#D6E9DB")+polaroid(cx+50*s,cy-10*s,110*s,8,"#FADADD"),
            "heart":lambda:bigheart(cx,cy,9*s,acc),"timeline":lambda:timeline(cx,cy,s*1.2,acc),
            "twohearts":lambda:bigheart(cx-30*s,cy,7*s,acc)+bigheart(cx+40*s,cy+30*s,5*s,"#FFB3B3")}[name]()

def defs(c1,c2,dark):
    return (f'<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient>'
            '<radialGradient id="glow"><stop offset="0" stop-color="#FFD56B" stop-opacity=".85"/><stop offset="1" stop-color="#FFD56B" stop-opacity="0"/></radialGradient>'
            '<filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#2E2E2E" flood-opacity=".22"/></filter></defs>')

def wrap(t,n): return textwrap.wrap(t,n)[:3]

def cover(d):
    slug,title,cat,c1,c2,acc,line,m,dark=d
    fg="#FFF9F1" if dark else "#2E2E2E"; W,H=800,600
    s=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'+defs(c1,c2,dark)+f'<rect width="{W}" height="{H}" fill="url(#g)"/>'
    s+=circ(690,90,170,"#fff",.22)+circ(70,540,150,"#fff",.18)+circ(430,640,240,acc,.1)
    s+=leaf(40,170,1.2,-30,"#9DBF9E")+leaf(70,150,1,10,"#B7D3B8")+flower(60,110,64,"#FF9AA2")+flower(750,560,76,"#FFC9D6",rot=20)+leaf(760,500,1.1,25,"#9DBF9E")
    s+=spark(380,70,1.4)+spark(120,420,1,"#fff",.9)+spark(730,330,.8)
    s+=motif(m,590,300,1.55,acc)
    y=250-(len(wrap(line,13))-1)*30
    for i,l in enumerate(wrap(line,13)): s+=f'<text x="64" y="{y+i*62}" font-family="{F}" font-size="58" fill="{fg}">{l.replace("&","&amp;")}</text>'
    s+=f'<text x="66" y="{y+len(wrap(line,13))*62+6}" font-family="{F}" font-style="italic" font-size="28" fill="{acc}">{cat}</text>'
    s+=f'<rect x="64" y="{y+len(wrap(line,13))*62+36}" width="150" height="4" rx="2" fill="{acc}" opacity=".6"/>'
    return s+'</svg>'

def screen(d,k):
    slug,title,cat,c1,c2,acc,line,m,dark=d
    fg="#FFF9F1" if dark else "#2E2E2E"; W,H=540,960
    a,b=(c2,c1) if k==1 else (c1,c2)
    s=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'+defs(a,b,dark)+f'<rect width="{W}" height="{H}" fill="url(#g)"/>'
    s+=circ(470,110,150,"#fff",.2)+circ(40,820,140,"#fff",.16)+flower(60,90,58,"#FF9AA2")+flower(490,880,70,"#FFC9D6",rot=15)+leaf(500,800,1.1,20,"#9DBF9E")+spark(420,60,1.1)+spark(80,520,.9,"#fff")
    s+=f'<text x="270" y="110" text-anchor="middle" font-family="{F}" font-size="30" fill="{fg}" opacity=".7">utsava.</text>'
    s+=motif(m,270,360 if k==1 else 340,1.8,acc)
    ls=wrap(line if k==1 else "For you, with love",14)
    for i,l in enumerate(ls): s+=f'<text x="270" y="{590+i*58}" text-anchor="middle" font-family="{F}" font-size="50" fill="{fg}">{l}</text>'
    s+=f'<text x="270" y="{600+len(ls)*58}" text-anchor="middle" font-family="{F}" font-style="italic" font-size="28" fill="{acc}">{cat}</text>'
    s+=f'<rect x="130" y="800" width="280" height="62" rx="31" fill="{"#FFF9F1" if dark else "#2E2E2E"}"/><text x="270" y="839" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="{"#2E2E2E" if dark else "#FFF9F1"}">{"Open your surprise" if k==1 else "Tap to continue"}</text>'
    return s+'</svg>'

T=[("timeless-love","Timeless Love","Anniversary","#FADADD","#FFD9C9","#E4577A","Our Forever","twohearts",False),
   ("birthday-bliss","Birthday Bliss","Birthday","#FFE8B8","#FFC4D6","#FF7A7A","Happy Birthday","cake",False),
   ("rakhi-bond","Rakhi Bond","Rakhi","#F7DCC6","#EDB98F","#9B1C3B","Rakhi Bond","rakhi",False),
   ("diwali-delight","Diwali Delight","Festive","#2B1210","#7A1F2E","#FFD56B","Festival of Lights","diya",True),
   ("will-you-marry-me","Will You Marry Me","Proposal","#E9D5FF","#FADADD","#B8862B","Forever Starts Here","ring",False),
   ("best-friends-forever","Best Friends Forever","Friendship","#D6E9DB","#E9D5FF","#4A7C59","Best Friends Forever","polaroids",False),
   ("be-mine-forever","Be Mine Forever","Valentine's","#FFD6DC","#FF9AA9","#9B1C3B","Be Mine","heart",False),
   ("our-story","Our Story","Anniversary","#FFF1D6","#FFD9A0","#B8862B","Our Story","timeline",False)]
for d in T:
    open(f"public/covers/{d[0]}.svg","w").write(cover(d))
    for k in (1,2): open(f"public/covers/{d[0]}-{k}.svg","w").write(screen(d,k))
print("covers ok")
