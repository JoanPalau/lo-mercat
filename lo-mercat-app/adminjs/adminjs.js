const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const express = require('express')
// import * as AdminJSPrisma from '@adminjs/prisma'
var _AdminJSPrisma = require('@adminjs/prisma');

var AdminJSPrisma = _interopRequireWildcard(_AdminJSPrisma);

function _interopRequireWildcard(obj) { 
    if (obj && obj.__esModule) { 
        return obj;
    } else {
        var newObj = {}; 
        if (obj != null) { 
            for (var key in obj) { 
                if (Object.prototype.hasOwnProperty.call(obj, key))
                    newObj[key] = obj[key];
            }
        }
        newObj.default = obj; 
        return newObj;
    }
}
const { PrismaClient } = require('@prisma/client')
// import { DMMFClass } from '@prisma/client/runtime'
// import { Category } from './category.entity'
// const Category = require('./category.entity')

const prisma = new PrismaClient()

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
})

const PORT = 3000

const start = async () => {
  const app = express()
  // `_baseDmmf` contains necessary Model metadata but it is a private method
  // so it isn't included in PrismaClient type
  const dmmf = ((prisma)._baseDmmf)
  const adminOptions = {
    resources: [
    {
      resource: { model: dmmf.modelMap.Market, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Farmer, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Stand, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Stock, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Product, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.OrderLine, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Purchase, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Customer, client: prisma },
      options: {},
    }
  ],
  }
  // Please note that some plugins don't need you to create AdminJS instance manually,
  // instead you would just pass `adminOptions` into the plugin directly,
  // an example would be "@adminjs/hapi"
  const admin = new AdminJS(adminOptions)
  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()