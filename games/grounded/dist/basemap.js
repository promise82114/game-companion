// MapGenie map 113 / Retro simple-v1. 同一 Web Mercator 座標投影供底圖與點位共用。
export const yardViewport={width:780,height:830};
export const basemap={zoom:11,tileSize:256,minX:1016,maxX:1023,minY:1016,maxY:1023,tileSetId:121,
 source:'https://mapgenie.io/grounded/maps/yard',attribution:'庭院底圖與座標：MapGenie · 遊戲圖像：Obsidian / Xbox Game Studios'};
const scale=570,worldSize=basemap.tileSize*2**basemap.zoom,units=360*scale/worldSize;
const worldPixel=([lng,lat])=>[(lng+180)/360*worldSize,(1-Math.asinh(Math.tan(lat*Math.PI/180))/Math.PI)/2*worldSize];
const origin=worldPixel([-1.38,1.46]);
export const projectYardPoint=point=>worldPixel(point).map((value,index)=>(value-origin[index])*units);
export const yardTiles=Array.from({length:basemap.maxX-basemap.minX+1},(_,x)=>Array.from({length:basemap.maxY-basemap.minY+1},(_,y)=>{
 const tileX=basemap.minX+x,tileY=basemap.minY+y;
 return {tileX,tileY,x:(tileX*basemap.tileSize-origin[0])*units,y:(tileY*basemap.tileSize-origin[1])*units,
  size:basemap.tileSize*units,path:`map-tiles/${tileX}-${tileY}.png`};
})).flat();
export const terrainHtml=()=>`<g id="yard-terrain" aria-hidden="true" pointer-events="none">${yardTiles.map(tile=>`<image data-basemap-tile href="${tile.path}" x="${tile.x}" y="${tile.y}" width="${tile.size}" height="${tile.size}" preserveAspectRatio="none"/>`).join('')}</g>`;
