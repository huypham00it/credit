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
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','${gg_tag_id}');`,
                    }}
                />
                <script async src={`https://www.googleoptimize.com/optimize.js?id=${gg_opt}`} />

                {/* GTM3  */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-TMVGTTH');`,
                    }}
                />
            </Head>
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
