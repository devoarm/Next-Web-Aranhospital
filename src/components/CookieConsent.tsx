'use client';

import { useEffect } from 'react';

import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

export default function Cookie() {
    useEffect(() => {
        CookieConsent.run({
            // root: 'body',
            // autoShow: true,
            // disablePageInteraction: true,
            // hideFromBots: true,
            // mode: 'opt-in',
            // revision: 0,

            cookie: {
                name: 'cc_cookie',
                // domain: location.hostname,
                // path: '/',
                // sameSite: "Lax",
                // expiresAfterDays: 365,
            },

            // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
            guiOptions: {
                consentModal: {
                    layout: 'cloud inline',
                    position: 'bottom center',
                    equalWeightButtons: true,
                    flipButtons: false,
                },
                preferencesModal: {
                    layout: 'box',
                    equalWeightButtons: true,
                    flipButtons: false,
                },
            },

            onFirstConsent: ({ cookie }) => {
                console.log('onFirstConsent fired', cookie);
            },

            onConsent: ({ cookie }) => {
                console.log('onConsent fired!', cookie);
            },

            onChange: ({ changedCategories, changedServices }) => {
                console.log('onChange fired!', changedCategories, changedServices);
            },

            onModalReady: ({ modalName }) => {
                console.log('ready:', modalName);
            },

            onModalShow: ({ modalName }) => {
                console.log('visible:', modalName);
            },

            onModalHide: ({ modalName }) => {
                console.log('hidden:', modalName);
            },

            categories: {
                necessary: {
                    enabled: true, // this category is enabled by default
                    readOnly: true, // this category cannot be disabled
                },
                analytics: {
                    autoClear: {
                        cookies: [
                            {
                                name: /^_ga/, // regex: match all cookies starting with '_ga'
                            },
                            {
                                name: '_gid', // string: exact cookie name
                            },
                        ],
                    },

                    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
                    services: {
                        ga: {
                            label: 'Google Analytics',
                            onAccept: () => {},
                            onReject: () => {},
                        },
                        youtube: {
                            label: 'Youtube Embed',
                            onAccept: () => {},
                            onReject: () => {},
                        },
                    },
                },
                ads: {},
            },

            language: {
                default: 'th', // 'en' or 'th'
                translations: {
                    en: {
                        consentModal: {
                            title: 'We use cookies',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            showPreferencesBtn: 'Manage Individual preferences',
                            // closeIconLabel: 'Reject all and close modal',
                            footer: `
                      <a href="#path-to-impressum.html" target="_blank">Impressum</a>
                      <a href="#path-to-privacy-policy.html" target="_blank">Privacy Policy</a>
                  `,
                        },
                        preferencesModal: {
                            title: 'Manage cookie preferences',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            savePreferencesBtn: 'Accept current selection',
                            closeIconLabel: 'Close modal',
                            serviceCounterLabel: 'Service|Services',
                            sections: [
                                {
                                    title: 'Your Privacy Choices',
                                    description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`,
                                },
                                {
                                    title: 'Strictly Necessary',
                                    description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                                    //this field will generate a toggle linked to the 'necessary' category
                                    linkedCategory: 'necessary',
                                },
                                {
                                    title: 'Performance and Analytics',
                                    description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                                    linkedCategory: 'analytics',
                                    cookieTable: {
                                        caption: 'Cookie table',
                                        headers: {
                                            name: 'Cookie',
                                            domain: 'Domain',
                                            desc: 'Description',
                                        },
                                        body: [
                                            {
                                                name: '_ga',
                                                domain: location.hostname,
                                                desc: 'Description 1',
                                            },
                                            {
                                                name: '_gid',
                                                domain: location.hostname,
                                                desc: 'Description 2',
                                            },
                                        ],
                                    },
                                },
                                {
                                    title: 'Targeting and Advertising',
                                    description:
                                        'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
                                    linkedCategory: 'ads',
                                },
                                {
                                    title: 'More information',
                                    description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>',
                                },
                            ],
                        },
                    },
                    // TH
                    th: {
                        consentModal: {
                            title: 'เว็บไซต์นี้ใช้คุ๊กกี้ 🍪',
                            description:
                                'ราใช้คุกกี้เพื่อเพิ่มประสบการณ์ที่ดีในการใช้เว็บไซต์ แสดงเนื้อหาและโฆษณาให้ตรงกับความสนใจ รวมถึงเพื่อวิเคราะห์การเข้าใช้งานเว็บไซต์และทำความเข้าใจว่าผู้ใช้งานมาจากที่ใด',
                            acceptAllBtn: 'ยอมรับทั้งหมด',
                            acceptNecessaryBtn: 'ปฎิเสธ',
                            showPreferencesBtn: 'ตั้งค่าคุ๊กกี้',
                            // closeIconLabel: 'Reject all and close modal',
                            footer: `
                    <a href="#path-to-impressum.html" target="_blank">Impressum</a>
                    <a href="#path-to-privacy-policy.html" target="_blank">Privacy Policy</a>
                `,
                        },
                        preferencesModal: {
                            title: 'ตั้งค่าความเป็นส่วนตัว 🔒',
                            acceptAllBtn: 'ยอมรับทั้งหมด',
                            acceptNecessaryBtn: 'ปฎิเสธทั้งหมด',
                            savePreferencesBtn: 'ยอมรับค่าปัจจุบัน',
                            closeIconLabel: 'Close modal',
                            serviceCounterLabel: 'Service|Services',
                            sections: [
                                {
                                    title: 'ประกาศความเป็นส่วนตัว 📢',
                                    description: `เว็บไซต์ของโรงพยาบาลอรัญประเทศใช้คุกกี้เพื่อจำแนกผู้ใช้งานแต่ละคน โดยทำหน้าที่หลัก คือ ประมวลทางสถิติ ตลอดจนลักษณะเฉพาะของกลุ่มผู้ใช้บริการนั้น ๆ ซึ่งข้อมูลดังกล่าวจะนำมาใช้ในการวิเคราะห์รูปแบบพฤติกรรมของผู้ใช้บริการ จะนำผลลัพธ์ดังกล่าวไปใช้ในการปรับปรุงเว็บไซต์ให้ตอบสนองความต้องการ และการใช้งานของผู้ใช้บริการให้ดียิ่งขึ้น อย่างไรก็ตามข้อมูลที่ได้และใช้ประมวลผลนั้นจะไม่มีการระบุชื่อ หรือบ่งบอกความเป็นตัวตนของผู้ใช้บริการแต่อย่างใด อีกทั้งไม่มีการเก็บข้อมูลส่วนบุคคล เช่น ชื่อ นามสกุล อีเมล เป็นต้น และใช้เป็นเพียงข้อมูลทางสถิติเท่านั้น ซึ่งจะช่วยให้เว็บไซต์โรงพยาบาลอรัญประเทศ สามารถมอบประสบการณ์ที่ดีในการใช้งานเว็บไซต์สำหรับคุณ และช่วยให้สามารถปรับปรุงเว็บไซต์ให้มีประสิทธิภาพยิ่งขึ้นได้ในเวลาเดียวกัน ทั้งนี้คุณสามารถเลือกตัวเลือกในการใช้งานคุกกี้ อ่านรายละเอียดเพิ่มเติมได้ที่ <a href="https://pdpa.moph.go.th/pdpa/index.php" target="_blank" rel="noopener noreferrer" class="cc-link">ประกาศความเป็นส่วนตัว</a>.'`,
                                },
                                {
                                    title: 'คุกกี้ที่จำเป็นอย่างยิ่ง',
                                    description: 'คุกกี้เหล่านี้มีความจำเป็นเพื่อให้ผู้เข้าใช้งานสามารถท่องเว็บไซต์และใช้งานฟีเจอร์ต่าง ๆ บนเว็บไซต์ของกรม เช่น เข้าถึงพื้นที่ที่ปลอดภัยบนเว็บไซต์ของกรม โดยกรมใช้คุกกี้ที่จำเป็นอย่างเคร่งครัดเพื่อให้แน่ใจว่าบริการเทคโนโลยีสารสนเทศของกรมทำงานหน้าที่พื้นฐานได้อย่างถูกต้องและสมบูรณ์',

                                    //this field will generate a toggle linked to the 'necessary' category
                                    linkedCategory: 'necessary',
                                },
                                {
                                    title: 'คุกกี้เพื่อประสิทธิภาพ และ วิเคราะห์',
                                    description: 'กรมใช้คุกกี้เพื่อประสิทธิภาพในการวัดว่าผู้เข้าใช้งานเข้าชมเว็บไซต์ของกรมบ่อยเพียงใดและผู้เข้าใช้งานใช้งานเว็บไซต์ของกรมอย่างไร เพจที่ผู้เข้าใช้งานเข้าชมบ่อยครั้งที่สุด โดยกรมใช้ข้อมูลนี้เพื่อการปรับปรุงประสิทธิภาพของเว็บไซต์และประสบการณ์ของผู้ใช้',
                                    linkedCategory: 'analytics',
                                    cookieTable: {
                                        caption: 'Cookie table',
                                        headers: {
                                            name: 'Cookie',
                                            domain: 'Domain',
                                            desc: 'Description',
                                        },
                                        body: [
                                            {
                                                name: '_ga',
                                                domain: location.hostname,
                                                desc: 'Description 1',
                                            },
                                            {
                                                name: '_gid',
                                                domain: location.hostname,
                                                desc: 'Description 2',
                                            },
                                        ],
                                    },
                                },
                                {
                                    title: 'คุกกี้เพื่อการโฆษณาประชาสัมพันธ์',
                                    description:
                                        'คุกกี้เหล่านี้ใช้เพื่อการโฆษณาประชาสัมพันธ์ ตามความเกี่ยวข้องของผู้เข้าใช้งานและตามความสนใจของผู้เข้าใช้งานมากขึ้น นอกจากนี้ ยังใช้เพื่อจำกัดจำนวนครั้งในการเห็นโฆษณา รวมถึงช่วยวัดประสิทธิภาพของการโฆษณาประชาสัมพันธ์ของกรม โดยในบางครั้งกรมเปิดเผยข้อมูลที่ไม่สามารถระบุตัวตนอันเกี่ยวกับกิจกรรมการเรียกดูของผู้เข้าใช้งานให้กับพันธมิตรด้านโฆษณาและพันธมิตรในการสร้างสรรค์งานของกรม โดยพันธมิตรเหล่านี้อาจใช้ข้อมูลนี้ในการโฆษณาสินค้า บริการ หรือกิจกรรมที่ผู้เข้าใช้งานอาจสนใจในเว็บไซต์อื่น ๆ หรือช่วยพัฒนาการโฆษณาประชาสัมพันธ์ของกรมในอนาคต',
                                    linkedCategory: 'ads',
                                },
                                {
                                    title: 'เพิ่มเติม',
                                    description: 'หากมีข้อสงสัยเกี่ยวกับนโยบายของฉันเกี่ยวกับคุกกี้และตัวเลือกของคุณ <a href="/contact">ติดต่อเรา</a>',
                                },
                            ],
                        },
                    },
                },
            },
        });
    }, []);

    return null;
}
