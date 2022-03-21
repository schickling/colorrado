import cn from 'classnames'
import { Sidebar } from 'src/components/Sidebar'
import { Navigation } from 'src/components/Navigation'
import { AppStateProvider } from '../hooks/useAppState'
import * as Tooltip from '@radix-ui/react-tooltip'
import React from 'react'
import dynamic from 'next/dynamic'

import '../styles.css'
import { Dropzone } from '~/components/Dropzone'

function App({ Component, pageProps }: any) {
  return (
    <div className={cn('flex h-screen w-screen overflow-hidden', 'bg-neutral-900 text-neutral-50')}>
      <Tooltip.Provider>
        <AppStateProvider>
          <Navigation />

          <Dropzone>
            <main className="flex-1 flex">
              <Component {...pageProps} />
            </main>

            <Sidebar />
          </Dropzone>
        </AppStateProvider>
      </Tooltip.Provider>
    </div>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
