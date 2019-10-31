const express= require('express');
const router = express.Router();
const vuelo=require("../models/vuelo");

router.get('/funcionario/funcionarioAbordaje', (req,res)=>{
    res.render("funcionario/funcionarioAbordaje");
})

router.post('/funcionario/abordar', async (req,res)=>{
    
    var cedula = req.body.cedula;
    var numeroVuelo = req.body.vuelo;
    var exito=[];

    var sinDatos=[];

    if(!cedula){
        sinDatos.push({text:"Debe ingresar el número de cédula"});
    }
    if(!numeroVuelo){
        sinDatos.push({text:"Debe ingresar el vuelo"});
    }

    if(sinDatos.length>0){
        res.render("funcionario/funcionarioAbordaje",{sinDatos});
    }
    else{

        var errores=[];
        var checkedIn=false;
        var seEcontro=false;

        await vuelo.findOne({idVuelo:numeroVuelo},async (err,vuelosEncontrado)=>{


            if(!vuelosEncontrado){
                sinDatos.push({text:"No existe el vuelo ingresado"});
                res.render("funcionario/funcionarioAbordaje",{sinDatos});
            }
            else{ 
                var contadorBoletos=1;
                var boletos = vuelosEncontrado.boletos;
                while(boletos.length>contadorBoletos){
                    
                    
                    if(boletos[contadorBoletos][2]==cedula){

                        seEcontro=true;

                        if(boletos[contadorBoletos][1]=='Checked'){

                            boletos[contadorBoletos][1]='Abordado';
                            checkedIn=true;
                        }
                    }
                    contadorBoletos+=1;
                }  
                
    
                if(seEcontro==true && checkedIn==false){
                    errores.push({text:"El pasajero no ha realizado Check In"});
                    res.render("funcionario/funcionarioAbordaje",{errores});  
                }
                else if(seEcontro==false && checkedIn==false){
                    errores.push({text:"El pasajero no se encuentra en ningun vuelo"});
                    res.render("funcionario/funcionarioAbordaje",{errores});  
                }
                else{
                    await vuelo.updateOne({idVuelo:numeroVuelo},{$set:{boletos:boletos}},function(err,res){
                        if(err){
                            console.log(err);
                        }
                        else{
                            exito.push({text:"Se ha abordado al pasajero con cédula "+cedula+" en el vuelo "+numeroVuelo});
                            res.render("funcionario/funcionarioAbordaje",{exito}); 
                        }
                    })
                    
                }
            }
        });

    }
})

module.exports = router;