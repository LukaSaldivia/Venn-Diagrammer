let c = document.querySelector('#canvas')

let ctx = c.getContext("2d")

let sizes = {
    w:window.innerWidth,
    h:window.innerWidth
}

c.width = sizes.w/1.5;
c.height = sizes.h/2.5;

ctx.fillStyle = "white";

ctx.fillRect(0, 0, c.width, c.height);

class Conjunto{
    constructor(xpos,ypos,size,[...elements]){
        this.xpos = xpos;
        this.ypos = ypos;
        this.size = size;
        this.elements = elements;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.xpos,this.ypos,this.size,0,Math.PI*2,false);
        ctx.stroke();
 

        this.elements.forEach((e,i)=>{
            e = e.toString();
            let total = this.elements.length;
            // let fontSize = 12;
            let fontSize = this.size*(1/(total+2))/(e.length)*3+5;

            ctx.font = `${fontSize}px Arial`;
            let textWidth = ctx.measureText(e).width;
            const angle = (Math.PI * 2) / total;
            ctx.fillStyle="black";
            const fontMetrics = ctx.measureText(e).fontBoundingBoxAscent;
            let x = total == 1 ? this.xpos : (this.xpos)+Math.cos(i * angle)*this.size/2
            
            // console.log(x)
            const y = total == 1 ? this.ypos+fontMetrics/3 : (this.ypos)+Math.sin(i * angle) * this.size/2 + fontMetrics/2
            ctx.fillText(e, x-textWidth/2, y);
        })
        
    }

    
}

let conjuntos_ingresados = [
    'luka'.split(''),'melany'.split(''),'gerardo'.split(''),'alicia'.split('')
]

function encontrarIntersecciones(conjuntos) {
    let intersecciones = []
    let arr_sin_comunes = []

    conjuntos.forEach((e)=>{
        conjuntos.forEach((f)=>{
            let interseccion = e.intersect(f);

            if(interseccion.length>0 && interseccion.length<e.length){
                intersecciones.push(interseccion);
            }
        })
        intersecciones.forEach(f=>{
            f.forEach(h=>{
                e.forEach((g,i)=>{
                    if(h===g){
                        e.splice(i,1);
                    }
                })
            })
        })
        arr_sin_comunes.push(e);
    })
    return [intersecciones,arr_sin_comunes]
}

function dibujarConjuntos(intersecciones,unicos,ctx,canvas) {
    unicos.forEach((e,i)=>{
        let c = new Conjunto(canvas.width/(unicos.length+1)*(i+1),canvas.height/9*(i+1)+30,canvas.width/13,e);
        c.draw(ctx);
    })

    intersecciones.forEach((e,i)=>{
        let c = new Conjunto(canvas.width/12*(i+1),canvas.height/12*(i+1)+150,20,e);
        c.draw(ctx);
    })
    
}

dibujarConjuntos(encontrarIntersecciones(conjuntos_ingresados)[0],encontrarIntersecciones(conjuntos_ingresados)[1],ctx,c);


