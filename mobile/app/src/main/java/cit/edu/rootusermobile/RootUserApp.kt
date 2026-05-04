package cit.edu.rootusermobile

import android.app.Application
import cit.edu.rootusermobile.core.di.appModule
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin

class RootUserApp : Application() {
    override fun onCreate() {
        super.onCreate()
        
        startKoin {
            androidLogger()
            androidContext(this@RootUserApp)
            modules(appModule)
        }
    }
}
