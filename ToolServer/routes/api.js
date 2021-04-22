var express = require('express');
var router = express.Router();
var pool = require('./pool')

router.post("/addAcount",(req,res)=>{
   
    let body =req.body;
    // console.log(body);
    let first_name = body['first_name'];
    let last_name = body['last_name'];
    let email = body['email']
    let password ="$2a$12$19qQKiHGrTieBqBztJUK3OUcZHNPr78G5kqBf29ilIK/hp8ck..y6";
    let sql = "insert into b_account(first_name,last_name,password,email,should_change_psw_flag,email_verified_flag,installer_flag) VALUES(?,?,?,?,?,?,?)";
    pool.getConnection(function(err,connection){
        if(err){
            // console.log("----")
            console.log(err)
            res.json({code:1,msg:"添加账号失败"});
            return;
        }
        connection.query(sql,[first_name,last_name,password,email,0,1,1],function(err,result){
            if(err){
               
                connection.rollback(function(){
                    console.log("事务失败"+"err"+err);
                });
                res.json({code:1,msg:"添加账号失败"});
            }else{
                console.log(result)
                res.json({code:0,msg:"添加账号成功"});
                
            }  
        });
        connection.release();
    });
    
    
})

router.post("/createCommunity",(req,res)=>{
   
    let body =req.body;
    console.log(req.body)
    let name = body['name']
    let address = body['address']
    let state = body['state']
    let city = body['city']
    let street = body['street']
    let postcode = body['postcode']
    let time_zone = body['time_zone']
    let phone = body['phone']
    let building_count = body['building_count']
    let apartment_count = body['apartment_count']
    let tenant_count=body['tenant_count']
    let admin_count=body['admin_count']
    let email = body['email']
    let sql = "insert into community (name,address,state,city,street,postcode,time_zone,phone,building_count,apartment_count,tenant_count,admin_count) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);";
    sqlparam = [name,address,state,city,street,postcode,time_zone,phone,building_count,apartment_count,tenant_count,admin_count]

    pool.getConnection(function(err,connection){
        if(err){
            console.log("-----------")
            console.log(err)
            res.json({code:1,msg:"添加community失败"});
            
        }else{
            connection.query(sql,sqlparam,(err,result)=>{
                if(err){
                    console.log("22222")
                    console.log(err)
                    res.json({code:1,msg:"添加community失败"});
                }else{
                    console.log(result)
                    res.redirect('/api/query/community?name='+name+'&email='+email)
                }
            });
            connection.release()
}     
    });  
    
});
router.get("/query/community",(req,res)=>{
    let params =req.query
    console.log(2222)
    console.log(params)
    let ename = params.name;
    let email = params.email
    let community_id = null
    let sql= 'select id from community where name = ?;';
    pool.getConnection(function(err,connection){
        if(err){
            res.json({code:1,msg:"添加community失败"});
            
        }else{
            connection.query(sql,[ename],(err,result)=>{
                if(err){
                    console.log("11111")
                    console.log(err)
                    res.json({code:1,msg:"添加community失败"});
                }else{
                    console.log(result[0])
                    community_id = result[0].id
                    res.redirect("/api/query/account?email="+email+'&community_id='+community_id)
                }
            });
            connection.release()
        }
    });
    

});
router.get("/query/account",(req,res)=>{
    let sql= 'select id from b_account where email=?;';
    let params = req.query
    let email=params.email
    let community_id = params.community_id
    let b_account_id = null
    pool.getConnection(function(err,connection){
       if(err){
            res.json({code:1,msg:"添加community失败"});
            
       }else{
        connection.query(sql,[email],(err,result)=>{
            if(err){
                console.log("2222")
                console.log(err)
                res.json({code:1,msg:"添加community失败"});
                
            }else{
                console.log(result[0])
                b_account_id = result[0].id
                res.redirect("/api/insert/communityadmin?b_account_id="+b_account_id+'&community_id='+community_id)
            }
        });
        connection.release()

       }

    });
    

});
router.get("/insert/communityadmin",(req,res)=>{
    let params =req.query
    let b_account_id=params.b_account_id
    let community_id=params.community_id
    let sql= "insert into community_admin(b_account_id,community_id,admin_type) values(?,?,?);"
    pool.getConnection(function(err,connection){
        if(err){
            res.json({code:1,msg:"添加community失败"});
            
        }else{
            connection.query(sql,[b_account_id,community_id,1],(err,result)=>{
                if(err){
                    console.log("111111111")
                    console.log(err)
                    res.json({code:1,msg:"添加community失败"});
                    
                    
                }else{
                    console.log(result)
                    res.json({code:0,msg:"添加community成功"});
                    
                }
            });
            connection.release()
        }

    });
    
});
router.post("/createBuilding",(req,res)=>{
   
    let body =req.body;
    console.log(req.body)
    let address = body['address']
    let num = body['num']
    let ename = body['name']
    let commnunity_id = body["id"]
    let sql = "insert into building(name,community_id,address,apartment_count) values(?,?,?,?);"
    let sqlParam =[ename,commnunity_id,address,num]
    pool.getConnection(function(err,connection){
        if(err){
            console.log("-----------")
            console.log(err)
            res.json({code:1,msg:"添加building失败"});
            
            
        }else{
            connection.query(sql,sqlParam,(err,result)=>{
                if(err){
                    console.log("building1111")
                    console.log(err)
                    res.json({code:1,msg:"添加building失败"});
                    
                }else{
                    console.log(result)
                    res.json({code:0,msg:"添加building成功"});
                    
                }
            });
            connection.release()
}     
    });  
    
});

router.post("/createApartment",(req,res)=>{
   
    let body =req.body;
    console.log(req.body)
    let aname = body['aname']
    let address = body['address']
    let room_type = body['room_type']
    let building_id = body['building_id']
    let sql = "insert into apartment(name,building_id,address,room_type) values(?,?,?,?);"
    let sqlParam =[aname,building_id,address,room_type]
    pool.getConnection(function(err,connection){
        if(err){
            console.log("-----------")
            console.log(err)
            res.json({code:1,msg:"添加apartment失败"});
            
            
        }else{
            connection.query(sql,sqlParam,(err,result)=>{
                if(err){
                    console.log("apartment1111")
                    console.log(err)
                    res.json({code:1,msg:"添加apartment失败"});
                    
                }else{
                    console.log(result)
                    res.json({code:0,msg:"添加apartment成功"});
                    
                }
            });
            connection.release()
}     
    });  
    
});

router.post("/createLocation",(req,res)=>{
   
    let body =req.body;
    console.log(req.body)
    let room_name = body['room_name']
    let apartment_id = body['apartment_id']
    let sql = "insert into location(name,apartment_id) values(?,?);"
    let sqlParam =[room_name,apartment_id]
    pool.getConnection(function(err,connection){
        if(err){
            console.log("-----------")
            console.log(err)
            res.json({code:1,msg:"添加location失败"});
            
            
        }else{
            connection.query(sql,sqlParam,(err,result)=>{
                if(err){
                    console.log("location1111")
                    console.log(err)
                    res.json({code:1,msg:"添加location失败"});
                    
                }else{
                    console.log(result)
                    res.json({code:0,msg:"添加location成功"});
                    
                }
            });
            connection.release()
}     
    });  
    
});

router.post("/addHubtoFactory",(req,res)=>{
   
    let body =req.body;
    console.log(req.body)
    let sn = body['sn']
    let deviceId = body['deviceId']
    let product_key = body['product_key']
    let device_type = body['device_type']
    let device_model = body['device_model']
    let sim_number = body['sim_number']
    let mac = body['mac']
    let manufacture_time = body['manufacture_time']
    let sql = "insert into hub_factory(sn,device_id,product_key,device_type,device_model,sim_number,mac,manufacture_time) values(?,?,?,?,?,?,?,?);"
    let sqlParam =[sn,deviceId,product_key,device_type,device_model,sim_number,mac,manufacture_time]
    pool.getConnection(function(err,connection){
        if(err){
            console.log("-----------")
            console.log(err)
            res.json({code:1,msg:"网关设备入库失败"});
            
            
        }else{
            connection.query(sql,sqlParam,(err,result)=>{
                if(err){
                    console.log("网关1111")
                    console.log(err)
                    res.json({code:1,msg:"网关设备入库失败"});
                    
                }else{
                    console.log(result)
                    res.json({code:0,msg:"网关设备入库成功"});
                    
                }
            });
            connection.release()
}     
    });  
    
});

router.post("/createdeviceLocation",(req,res)=>{
   
    let body =req.body;
    console.log(req.body)
    let apartment_id = body['apartment_id']
    let bind_time = body['bind_time']
    let device_type = body['device_type']
    let community_id = body['community_id']
    let location_id = body['location_id']
    let sql = "insert into apartment_device(device_type,community_id,apartment_id,location_id,bind_time) values(?,?,?,?,?);"
    let sqlParam =[device_type,community_id,apartment_id,location_id,bind_time]
    pool.getConnection(function(err,connection){
        if(err){
            console.log("-----------")
            console.log(err)
            res.json({code:1,msg:"创建设备插槽失败"});
            
            
        }else{
            connection.query(sql,sqlParam,(err,result)=>{
                if(err){
                    console.log("创建设备插槽1111")
                    console.log(err)
                    res.json({code:1,msg:"创建设备插槽失败"});
                    
                }else{
                    console.log(result)
                    res.json({code:0,msg:"创建设备插槽成功"});
                    
                }
            });
            connection.release()
}     
    });  
    
});


router.get("/getAccounts",(req,res)=>{
    let sql = `select email from b_account`;
    pool.getConnection(function(err,connection){
        if(err) console.log(err);
        connection.query(sql,(err,result)=>{
            if(err){
                console.log(err)
                return ;
            }else{
                res.json({code:0,data:result})
            }
        });
    connection.release()
    });
    
});

router.get("/getbuidingsByid",(req,res)=>{
    let community_id = req.query.community_id;
    let sql = 'select id,name from building where community_id=?;';
    pool.getConnection(function(err,connection){
        if(err) console.log(err);
        connection.query(sql,[community_id],(err,result)=>{
            if(err){
                console.log(err)
                return ;
            }else{
                res.json({code:0,data:result})
                res.end()
            }
        });
    connection.release()
    });
    
});

router.get("/getApartmentByid",(req,res)=>{
    let building_id = req.query.building_id;
    let sql = 'select id,address from apartment where building_id=?;';
    pool.getConnection(function(err,connection){
        if(err) console.log(err);
        connection.query(sql,[building_id],(err,result)=>{
            if(err){
                console.log(err)
                return ;
            }else{
                res.json({code:0,data:result})
                res.end()
            }
        });
    connection.release()
    });
    
});

router.get("/getLocationByid",(req,res)=>{
    let apartment_id = req.query.apartment_id;
    let sql = 'select id,name from location where apartment_id=?;';
    pool.getConnection(function(err,connection){
        if(err) console.log(err);
        connection.query(sql,[apartment_id],(err,result)=>{
            if(err){
                console.log(err)
                return ;
            }else{
                res.json({code:0,data:result})
                res.end()
            }
        });
    connection.release()
    });
    
});

router.get("/getDeviceType",(req,res)=>{
    let sql = 'select distinct(device_type) from device_type;select device_model from device_type;';
    pool.getConnection(function(err,connection){
        if(err) console.log(err);
        connection.query(sql,(err,result)=>{
            if(err){
                console.log(err)
                return ;
            }else{
                res.json({code:0,data:{"device_types":result[0],"device_models":result[1]}})
                res.end()
            }
        });
    connection.release()
    });
    
});


router.post("/queryDevice",(req,res)=>{
    let body = req.body
    console.log(body)
    let deviceType = body['device_type']
    let device_id = body['device_id']
    // console.log(device_id)
    // console.log(deviceType)
    let sql = ""
    if(deviceType == 1){
        // console.log("deviceType=1")
         sql ="select * from hub_factory where device_id=?"
    }else{
        //  console.log("deviceType=2")
         sql = "select * from sub_device_factory where sub_device_id=?"
    }
    pool.getConnection(function(err,connection){
        if(err){
            console.log(err)
            res.json({code:1,msg:"查询失败"})
        }else{
            connection.query(sql,device_id,(err,result)=>{
                // console.log(sql)
                if(err) console.log(err)
                console.log(`result:${result}`)
                if(result.length>0){
                    res.json({code:0,msg:`${device_id}已经入库`})
                }else{
                    res.json({code:2,msg:`${device_id}不在库中`})
                }

            })
        }


    });

});

router.get("/getCommunities",(req,res)=>{
    let sql = 'select id,name from community';
    pool.getConnection(function(err,connection){
        if(err) console.log(err);
        connection.query(sql,(err,result)=>{
            if(err){
                console.log(err)
                return ;
            }else{
                res.json({code:0,data:result})
            }
        });
    connection.release()
    });
    
});

module.exports = router;
