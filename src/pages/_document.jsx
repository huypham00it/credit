/* eslint-disable @next/next/next-script-for-ga */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    const gg_tag_id = process.env.NEXT_PUBLIC_GG_TAG_MANAGER;
    const gg_opt = process.env.NEXT_PUBLIC_GO_ID;

    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <script async src="/libs/gauge.min.js"></script>
            </Head>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-5T0H5QNSV4"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `  window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', 'G-5T0H5QNSV4');`,
                }}
            ></script>
            <body>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gg_tag_id}"
					height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    }}
                />
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src=“https://www.googletagmanager.com/ns.html?id=GTM-TMVGTTH”
                        height=“0" width=“0” style=“display:none;visibility:hidden”></iframe>`,
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
