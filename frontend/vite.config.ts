import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			strategies: 'injectManifest', // the vite-plugin-pwa plugin will compile your custom service worker and inject its precache manifest
			injectRegister: 'inline', // register the service worker myself
			srcDir: 'src/service-worker',
			filename: 'sw.ts',
			devOptions: { enabled: false },
			injectManifest: {
				injectionPoint: undefined, // prevent from Error: Unable to find a place to inject the manifest
			},
			manifest: {
				name: 'PWA Notification',
				short_name: 'PWA Notification', // 會顯示在 web app 的名稱
				theme_color: '#fff',
				description: 'this is description',
				icons: [
					{
						src: '/logo.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
})
