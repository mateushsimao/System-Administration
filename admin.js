
const mongoose = require('mongoose')
const express = require('express')
const formidableMiddleware = require('express-formidable');
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')



AdminBro.registerAdapter(require('admin-bro-mongoose'))

const app = express()
app.use(formidableMiddleware());

const User = mongoose.model('user', { name: {type: String, unique: true, required: true}, email: {type: String, match: /.+\@.+\..+/, unique: true, required: true}, password: {type: String, unique: false, required: true} })
const Channel = mongoose.model('channel', { name: {type: String, unique: true, required: true}, video: {type: String, unique: true, required: true}, image: {type: String, unique: true, required: true} })
const Contacs = mongoose.model('contacs', { name: {type: String, required: true}, email: {type: String, match: /.+\@.+\..+/, equired: true}, menssage: {type: String, required: true}, answered: Boolean })


const adminBro = new AdminBro({

  resources: [User, Channel, Contacs],
  rootPath: '/admin',
  loginPath: '/admin/login',
  logoutPath: '/admin/logout',
  branding: {
    companyName: 'Sistema IPTV',
    softwareBrothers: false,
    logo: false,
    favicon: "https://cdn.iconscout.com/icon/premium/png-256-thumb/iptv-640373.png", 
      
  },
  locale: {
    translations: {
        messages: {
            loginWelcome: 'Você nunca sabe que resultados virão da sua ação. Mas se você não fizer nada, não existirão resultados.' 
        },
        labels: {
            loginWelcome: 'Sistema de administração', 
        },
    }
  },
  dashboard: {
    component: AdminBro.bundle('./components/dashboard/index'),
  },

})


const canEditEmp = ({ currentAdmin, record }) => {
  return currentAdmin && (
    currentAdmin.role === 'admin'
  )
}
const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'
const AdminBroOptions = {
  resources: 
  [{
    resource: User,
    options: {
      properties: {
        ownerId: { isVisible: { edit: false, show: true, list: true, filter: true } }
      },
      actions: {
        edit: { isAccessible: canEditEmp },
        delete: { isAccessible: canEditEmp },
        new: { isAccessible: canEditEmp },
      }
   }},
   {
    resource: User,  
    options: {
      properties: {
        encryptedPassword: { isVisible: false },
        password: {
          type: 'string',
          isVisible: {
            list: false, edit: true, filter: false, show: false,
          },
        },
      },
      actions: {
        new: {
          before: async (request) => {
            if(request.payload.record.password) {
              request.payload.record = {
                ...request.payload.record,
                encryptedPassword: await bcrypt.hash(request.payload.record.password, 10),
                password: undefined,
              }
            }
            return request
          },
        },
        edit: { isAccessible: canModifyUsers },
        delete: { isAccessible: canModifyUsers },
        new: { isAccessible: canModifyUsers },
      }
    }
  }],
}
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email })
      if (user) {
        if (password === user.password) {
          return user
        }
      }
    return false
  },
  cookiePassword: 'session Key',
})


app.use(adminBro.options.rootPath, router)

const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/tvDB', { useNewUrlParser: true })
  await app.listen(30002, () => console.log(`app admin listening on port 30002!`))
}

run()