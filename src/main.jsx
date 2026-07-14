import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const DISCORD_URL = 'https://discord.gg/guf9ca4YSA';
const QQ_URL = 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=qBP7Ss78sT68OOSMO5mpzAgp5Py3sOKJ&authKey=3I0V1ckK1NCWK%2BmKKZskA6oi6BgA96z1pipSaUjGxgXs%2Br3qPp3aV%2BbChu%2FjPjjO&noverify=0&group_code=975714136';

const regionLinks = [
  {
    code: 'AS',
    name: 'NikoAS',
    nameZh: 'Niko 亚洲',
    host: 'au-as.niko233.top',
    tone: 'orange',
    api: 'https://au-as.niko233.top/api/counts',
    url: 'amongus://init?servername=Niko233(AS)&serverport=443&serverip=https%3A%2F%2Fau-as.niko233.top&usedtls=false',
  },
  {
    code: 'NA',
    name: 'NikoNA',
    nameZh: 'Niko 北美',
    host: 'au-us.niko233.top',
    tone: 'violet',
    api: 'https://au-us.niko233.top/api/counts',
    url: 'amongus://init?servername=Niko233(NA)&serverport=443&serverip=https%3A%2F%2Fau-us.niko233.top&usedtls=false',
  },
  {
    code: 'EU',
    name: 'NikoEU',
    nameZh: 'Niko 欧洲',
    host: 'au-eu.niko233.top',
    tone: 'blue',
    api: 'https://au-eu.niko233.top/api/counts',
    url: 'amongus://init?servername=Niko233(EU)&serverport=443&serverip=https%3A%2F%2Fau-eu.niko233.top&usedtls=false',
  },
  {
    code: 'CN',
    name: 'NikoCN',
    nameZh: 'Niko 中国',
    host: 'au-cn.niko233.top',
    tone: 'green',
    api: 'https://au-cn.niko233.top/api/counts',
    url: 'amongus://init?servername=Niko233(CN1)&serverport=443&serverip=https%3A%2F%2Fau-cn.niko233.top&usedtls=false',
  },
];

const moddedLinks = [
  { code: 'M-NA', label: 'Modded NA', url: 'amongus://init?servername=Modded_NA&serverport=443&serverip=https%3A%2F%2Faumods.org&usedtls=false' },
  { code: 'M-EU', label: 'Modded EU', url: 'amongus://init?servername=Modded_EU&serverport=443&serverip=https%3A%2F%2Fau-eu.duikbo.at&usedtls=false' },
  { code: 'M-AS', label: 'Modded AS', url: 'amongus://init?servername=Modded_AS&serverport=443&serverip=https%3A%2F%2Fau-as.duikbo.at&usedtls=false' },
];

const copy = {
  en: {
    navInstall: 'Install',
    navMobile: 'Mobile',
    navRules: 'Rules',
    navSupport: 'Support',
    heroEyebrow: 'PRIVATE SERVER / CREW READY',
    heroTitle: 'Install the regions',
    heroTitleAccent: 'Join the lobby.',
    heroDescription: 'A custom Among Us region, hosted for friends, modded communities, and anyone who wants a safer corner of the Skeld.',
    heroPrimary: 'Start installation',
    heroSecondary: 'Join Discord',
    heroFootnote: 'Hosted since 2023 by NikoCat233 with love',
    heroOrigin: 'custom region',
    regions: 'regions',
    platforms: 'platforms',
    online: 'online now',
    rooms: 'active rooms',
    onlinePlayers: 'online players',
    playerPulse: 'PLAYER PULSE',
    live: 'Online',
    checking: 'CHECKING SIGNAL',
    installEyebrow: '01 / Add the regions',
    installTitle: 'Choose your platform.',
    installDescription: 'Pick the platform you play on. The recommended desktop script takes less than a minute; the manual routes are here when you want to see every file.',
    desktop: 'Windows desktop',
    desktopShort: 'PC',
    desktopDescription: 'Steam · Epic · itch.io · Xbox app',
    mobile: 'Android / iPhone',
    mobileShort: 'Mobile',
    mobileDescription: 'Tap a region while Among Us is open',
    console: 'Console',
    consoleShort: 'Console',
    consoleDescription: 'PS · Xbox · Switch',
    recommended: 'RECOMMENDED',
    method1: 'Run the install script',
    method2: 'Replace regioninfo.json manually',
    method3: 'Microsoft Store version',
    method4: 'Extra: Mini.RegionInstall',
    scriptLead: 'Close Among Us first, then download and run the setup script. Open Among Us again after it finishes.',
    scriptDetail: 'Works with Steam, Epic Games Store, itch.io, and the Xbox app / Microsoft Store. If it does not take effect, right-click the file and choose “Run as administrator”.',
    downloadScript: 'Download Setup_Custom_Server.bat',
    manualLead: 'For a transparent, manual setup:',
    manualStep1: 'Download',
    manualStep2: 'Press Win + R and open',
    manualStep3: 'Replace the existing file, then restart the game.',
    storeLead: 'If the script does not work on the Microsoft Store version, follow the save-file route:',
    storeStep2: 'Open',
    storeStep3: 'Find the folder with long numeric names and open the JSON-like save file inside.',
    storeStep4: 'Paste the contents of regioninfo.json, save, and restart.',
    extraLead: 'Using Mini.RegionInstall? Download the config and place it in',
    copyHint: 'click to copy',
    copied: 'Copied to clipboard',
    mobileEyebrow: 'MOBILE QUICK CONNECT',
    mobileLead: 'Keep Among Us running in the background, then tap a region button.',
    mobileVirtual: 'Using Gspace, OurPlay, or another virtual environment?',
    mobileVirtualDetail: 'Import a browser into the same environment, launch Among Us there first, then open this page from that browser and tap again.',
    videoGuide: 'Watch mobile guide',
    modded: 'Modded regions',
    consoleLead: 'There is no simple install flow for PS / Xbox / Switch right now.',
    consoleHint: 'If console support changes, this panel will be the first place we update.',
    quickEyebrow: 'QUICK START',
    quickTitle: 'Three moves to orbit.',
    quick1Title: 'Choose a platform',
    quick1Detail: 'Use the recommended script on Windows, or jump to your mobile region below.',
    quick2Title: 'Restart the game',
    quick2Detail: 'The custom region loads when Among Us starts again. Keep the app in the foreground on mobile.',
    quick3Title: 'Find your crew',
    quick3Detail: 'Use the in-game region selector and look for Niko233. See you in the lobby.',
    statusEyebrow: 'NETWORK PULSE',
    statusTitle: 'Server rules, in plain language.',
    rulesLead: 'Follow the rules so we all play in harmony.',
    rule1: 'No cheating of any kind.',
    rule2: 'No insults, harassment, or racial discrimination.',
    rule3: 'No ban evasion.',
    rule4: 'Breaking these rules results in a ban.',
    privacy: 'Read the privacy policy',
    supportEyebrow: 'KEEP THE LIGHTS ON',
    supportTitle: 'Built by a player, kept online by the community.',
    supportLead: 'If this server helps you find games, you can help cover hosting and domain costs.',
    kofi: 'Donate via Ko-fi',
    wechat: 'WeChat donate',
    contact: 'Contact',
    contactHeadline: 'Reach the crew.',
    contactLead: 'Need help or want to share feedback? Reach out here.',
    email: 'Email',
    qq: 'China QQ group',
    footer: 'A small server for mega lobbies.',
    hostedWithLove: 'Hosted since 2023 by NikoCat233 with love',
    footerPolicy: 'Privacy policy',
    modalTitle: 'Scan to support',
    modalClose: 'Close',
  },
  zh: {
    navInstall: '安装',
    navMobile: '手机端',
    navRules: '规则',
    navSupport: '联系',
    heroEyebrow: '私服频道 / 等你入场',
    heroTitle: '安装私服',
    heroTitleAccent: '加入房间',
    heroDescription: '一个遥遥领先于同行的 Among Us 私服。(不包括 miniduikboot 的产品)',
    heroPrimary: '开始安装',
    heroSecondary: '加入 QQ 群',
    heroFootnote: 'NikoCat233 用爱维护 · 自 2023 年起',
    heroOrigin: '自定义私服',
    regions: '区域',
    platforms: '平台',
    online: '当前在线',
    rooms: '当前房间',
    onlinePlayers: '在线玩家',
    playerPulse: '在线玩家',
    live: 'Online',
    checking: '正在检测',
    installEyebrow: '01 / 选择平台',
    installTitle: '选择进入方式。',
    installDescription: '选择你正在使用的平台。Windows 推荐脚本不到一分钟即可完成；如果你想知道每个文件的位置，也可以使用手动方式。',
    desktop: 'Windows 桌面端',
    desktopShort: '电脑',
    desktopDescription: 'Steam · Epic · itch.io · Xbox app',
    mobile: 'Android / iPhone',
    mobileShort: '手机',
    mobileDescription: '保持 Among Us 后台运行后点击你想安装的区域',
    console: '主机平台',
    consoleShort: '主机',
    consoleDescription: 'PS · Xbox · Switch',
    recommended: '推荐方式',
    method1: '运行安装脚本',
    method2: '手动替换 regioninfo.json',
    method3: '微软商店版本',
    method4: '额外方式：Mini.RegionInstall',
    scriptLead: '先关闭 Among Us，下载并运行安装脚本。脚本完成后重新打开游戏。',
    scriptDetail: '支持 Steam、Epic Games Store、itch.io 和 Xbox app / Microsoft Store。如果没有生效，请右键文件并选择“以管理员身份运行”。',
    downloadScript: '下载 Setup_Custom_Server.bat',
    manualLead: '如果你希望完全手动完成安装：',
    manualStep1: '下载',
    manualStep2: '按 Win + R，打开',
    manualStep3: '替换现有文件，然后重启游戏。',
    storeLead: '如果微软商店版无法使用脚本，请按下面的存档文件方式操作：',
    storeStep2: '打开',
    storeStep3: '找到名称很长的数字文件夹，打开里面类似 JSON 的存档文件。',
    storeStep4: '粘贴 regioninfo.json 内容，保存后重启。',
    extraLead: '如果你使用 Mini.RegionInstall，下载配置文件并放到',
    copyHint: '点击复制',
    copied: '已复制到剪贴板',
    mobileEyebrow: '手机端快速连接',
    mobileLead: '先让 Among Us 保持后台运行，再点击下面的区域按钮。',
    mobileVirtual: '如果你在 Gspace、OurPlay 或其他虚拟环境里运行？',
    mobileVirtualDetail: '把浏览器也导入同一个环境，先在那里启动 Among Us，再用该浏览器打开本页并重新点击。',
    videoGuide: '观看手机端安装指引',
    modded: 'Modded 私服',
    consoleLead: '目前 PS / Xbox / Switch 没有简单的安装方式。',
    consoleHint: '如果主机支持有变化，我们会第一时间在这里更新。',
    quickEyebrow: '快速开始',
    quickTitle: '三步速装。',
    quick1Title: '选择方式',
    quick1Detail: 'Windows 使用推荐脚本，手机端直接点击下面的区域按钮。',
    quick2Title: '重启游戏',
    quick2Detail: 'Among Us 重启后才会加载自定义区域。手机端请保持应用在前台。',
    quick3Title: '找到你的队伍',
    quick3Detail: '在游戏区域选择器里找到 Niko233。大厅见。',
    statusEyebrow: '网络脉冲',
    statusTitle: '服务器规则',
    rulesLead: '这是一个社区服务器。保持公平、友善，也让管理变得简单。',
    rule1: '禁止任何形式的作弊。',
    rule2: '禁止辱骂、骚扰和种族歧视。',
    rule3: '禁止绕过封禁。',
    rule4: '违反规则可能会被封禁。',
    privacy: '查看隐私政策',
    supportEyebrow: '支持服务器',
    supportTitle: '由玩家搭建，也由社区一起维持。',
    supportLead: '如果这个服务器帮助到你，可以捐赠支持托管和域名费用。',
    kofi: '通过 Ko-fi 赞助',
    wechat: '微信赞助',
    contact: '联系方式',
    contactHeadline: '找到我们。',
    contactLead: '需要帮助或想反馈？可以从这里联系。',
    email: '邮件',
    qq: '中国 QQ 群',
    footer: '为所有玩家准备的私服。',
    hostedWithLove: 'Hosted since 2023 by NikoCat233 with love',
    footerPolicy: '隐私政策',
    modalTitle: '扫码支持',
    modalClose: '关闭',
  },
};

function getInitialLanguage() {
  try {
    const stored = window.localStorage.getItem('impostor-language');
    if (stored === 'en' || stored === 'zh') return stored;
  } catch {
    // Local storage can be disabled in private browsing. Browser detection still works.
  }

  const path = window.location.pathname.toLowerCase();
  if (path.includes('cn') || path.includes('zh')) return 'zh';
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language || ''];
  return browserLanguages.some((language) => String(language).toLowerCase().startsWith('zh')) ? 'zh' : 'en';
}

function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    external: <><path d="M14 4h6v6" /><path d="m10 14 10-10" /><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" /></>,
    copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.7-4.7" /></>,
    terminal: <><path d="m4 17 6-5-6-5" /><path d="M12 19h8" /></>,
    phone: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 5h4" /><path d="M11 18h2" /></>,
    gamepad: <><path d="M6.5 11.5h11" /><path d="M8 8v7" /><path d="M5.5 10.5 4 16a2.4 2.4 0 0 0 4.5 1.3L10 15h4l1.5 2.3A2.4 2.4 0 0 0 20 16l-1.5-5.5A6.1 6.1 0 0 0 12 6a6.1 6.1 0 0 0-6.5 4.5Z" /><path d="M16 10.5h.01M18 8.5h.01" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    activity: <><path d="M3 12h4l2-7 4 14 2-7h6" /></>,
    heart: <path d="M20.8 8.6c0 5.2-8.8 10.4-8.8 10.4S3.2 13.8 3.2 8.6A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 8.8 2.3Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-3-.5L4 20l1.5-3.6A7.1 7.1 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };

  return <svg {...common}>{paths[name] || paths.arrow}</svg>;
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-eye" />
      <span className="brand-leg brand-leg-left" />
      <span className="brand-leg brand-leg-right" />
    </span>
  );
}

function LanguageToggle({ language, onChange }) {
  return (
    <div className="language-toggle" role="group" aria-label="Language switch">
      <button type="button" className={language === 'en' ? 'is-active' : ''} onClick={() => onChange('en')}>EN</button>
      <span>/</span>
      <button type="button" className={language === 'zh' ? 'is-active' : ''} onClick={() => onChange('zh')}>中</button>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <div className={`section-heading${dark ? ' section-heading-dark' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function useLiveCounts() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    Promise.allSettled(
      regionLinks
        .filter((region) => region.api)
        .map(async (region) => {
          const response = await fetch(region.api, { signal: controller.signal });
          if (!response.ok) throw new Error(`Unable to reach ${region.code}`);
          const data = await response.json();
          return [region.code, data];
        }),
    ).then((results) => {
      const nextCounts = {};
      results.forEach((result) => {
        if (result.status === 'fulfilled') nextCounts[result.value[0]] = result.value[1];
      });
      setCounts(nextCounts);
    });

    return () => controller.abort();
  }, []);

  const totalPlayers = Object.values(counts).reduce((sum, item) => sum + Number(item?.players || 0), 0);
  const totalGames = Object.values(counts).reduce((sum, item) => sum + Number(item?.games || 0), 0);

  return { counts, totalPlayers, totalGames, hasLiveData: Object.keys(counts).length > 0 };
}

function CopyCode({ children, onCopy, copied, hint }) {
  return (
    <button type="button" className="copy-code" onClick={() => onCopy(children)} title={hint}>
      <code>{children}</code>
      <span className="copy-code-action"><Icon name={copied === children ? 'shield' : 'copy'} size={14} />{copied === children ? '✓' : ''}</span>
    </button>
  );
}

function StepRow({ number, title, children }) {
  return (
    <div className="step-row">
      <span className="step-number">{number}</span>
      <div>
        <h3>{title}</h3>
        <div className="step-detail">{children}</div>
      </div>
    </div>
  );
}

function AccordionItem({ number, title, open, onToggle, children, badge }) {
  return (
    <article className={`accordion-item${open ? ' is-open' : ''}`}>
      <button type="button" className="accordion-trigger" onClick={onToggle} aria-expanded={open}>
        <span className="accordion-number">{number}</span>
        <span className="accordion-title">{title}</span>
        {badge && <span className="accordion-badge">{badge}</span>}
        <Icon name="chevron" size={18} />
      </button>
      <div className="accordion-content" aria-hidden={!open}>
        <div className="accordion-content-inner">{children}</div>
      </div>
    </article>
  );
}

function RegionButton({ region, language, counts }) {
  const name = language === 'zh' ? region.nameZh : region.name;
  const stats = counts?.[region.code];
  return (
    <a className={`region-button region-${region.tone}`} href={region.url}>
      <span className="region-button-top">
        <span className="region-code">{region.code}</span>
        <Icon name="arrow" size={16} />
      </span>
      <strong>{name}</strong>
      <span className="region-host">{region.host}</span>
      {stats && <span className="region-live"><i /> {stats.players ?? 0} players · {stats.games ?? 0} games</span>}
    </a>
  );
}

function DesktopInstall({ t, language, copied, onCopy, openMethod, setOpenMethod }) {
  return (
    <div className="install-panel-content">
      <div className="panel-intro-row">
        <div>
          <p className="panel-kicker"><Icon name="terminal" size={16} /> {language === 'zh' ? '桌面端安装' : 'DESKTOP INSTALL'}</p>
          <p className="panel-lead">{language === 'zh' ? '优先使用自动安装脚本。脚本安装失败后，再展开下面的手动方式。' : 'Try the automatic script first. When you want more control, open one of the manual routes below.'}</p>
        </div>
        <span className="platform-stamp"><Icon name="shield" size={15} /> {t.recommended}</span>
      </div>
      <div className="accordion-list">
        <AccordionItem number="01" title={t.method1} badge={t.recommended} open={openMethod === 0} onToggle={() => setOpenMethod(openMethod === 0 ? -1 : 0)}>
          <p>{t.scriptLead}</p>
          <p>{t.scriptDetail}</p>
          <a className="download-link" href="/Setup_Custom_Server.bat" download>
            <span><Icon name="download" size={16} /> {t.downloadScript}</span><Icon name="arrow" size={16} />
          </a>
        </AccordionItem>
        <AccordionItem number="02" title={t.method2} open={openMethod === 1} onToggle={() => setOpenMethod(openMethod === 1 ? -1 : 1)}>
          <p>{t.manualLead}</p>
          <ol className="instruction-list">
            <li>{t.manualStep1} <a href="/regioninfo.json" download>regioninfo.json</a>.</li>
            <li>{t.manualStep2} <CopyCode copied={copied} onCopy={onCopy} hint={t.copyHint}>%userprofile%\AppData\LocalLow\Innersloth\Among Us</CopyCode>.</li>
            <li>{t.manualStep3}</li>
          </ol>
          <div className="screenshot-stack">
            <img src="/win-run.png" alt={language === 'zh' ? '从运行窗口打开 Among Us 文件夹' : 'Open the Among Us folder from Run'} />
            <img src="/replace.png" alt={language === 'zh' ? '替换 regioninfo.json' : 'Replace regioninfo.json'} />
          </div>
        </AccordionItem>
        <AccordionItem number="03" title={t.method3} open={openMethod === 2} onToggle={() => setOpenMethod(openMethod === 2 ? -1 : 2)}>
          <p>{t.storeLead}</p>
          <ol className="instruction-list">
            <li>{t.manualStep1} <a href="/regioninfo.json" download>regioninfo.json</a>.</li>
            <li>{t.storeStep2} <CopyCode copied={copied} onCopy={onCopy} hint={t.copyHint}>%userprofile%\AppData\Local\Packages\Innersloth.AmongUs_fw5x688tam7rm\SystemAppData\wgs</CopyCode>.</li>
            <li>{t.storeStep3}</li>
            <li>{t.storeStep4}</li>
          </ol>
          <div className="screenshot-grid">
            {['microsoft-data-folder.png', 'microsoft-data-folder-2.png', 'microsoft-data-folder-3.png', 'microsoft-data-folder-4.png'].map((image) => <img key={image} src={`/${image}`} alt="Microsoft Store installation guide" />)}
          </div>
        </AccordionItem>
        <AccordionItem number="04" title={t.method4} open={openMethod === 3} onToggle={() => setOpenMethod(openMethod === 3 ? -1 : 3)}>
          <p>{t.extraLead} <CopyCode copied={copied} onCopy={onCopy} hint={t.copyHint}>Among Us\BepInEx\config</CopyCode>.</p>
          <a className="text-link" href="/at.duikbo.regioninstall.cfg" download><Icon name="download" size={15} /> at.duikbo.regioninstall.cfg</a>
        </AccordionItem>
      </div>
    </div>
  );
}

function MobileInstall({ t, language, counts }) {
  return (
    <div className="install-panel-content mobile-content">
      <div className="panel-intro-row">
        <div>
          <p className="panel-kicker"><Icon name="phone" size={16} /> {t.mobileEyebrow}</p>
          <p className="panel-lead">{t.mobileLead}</p>
        </div>
        <span className="platform-stamp stamp-green"><Icon name="activity" size={15} /> {language === 'zh' ? '一键跳转' : 'DEEP LINK'}</span>
      </div>
      <div className="region-grid">
        {regionLinks.map((region) => <RegionButton key={region.code} region={region} language={language} counts={counts} />)}
      </div>
      <div className="modded-block">
        <div className="modded-heading"><span><Icon name="globe" size={15} /> {t.modded}</span><small>miniduikboot</small></div>
        <div className="modded-links">{moddedLinks.map((region) => <a key={region.code} href={region.url}>{region.label}<Icon name="arrow" size={14} /></a>)}</div>
      </div>
      <div className="mobile-note">
        <div className="note-icon"><Icon name="phone" size={17} /></div>
        <div><strong>{t.mobileVirtual}</strong><p>{t.mobileVirtualDetail}</p></div>
      </div>
      <a className="video-link" href="/mobile_guide.webm" target="_blank" rel="noreferrer"><span><Icon name="external" size={15} /> {t.videoGuide}</span><span>WEBM <Icon name="arrow" size={14} /></span></a>
    </div>
  );
}

function ConsoleInstall({ t }) {
  return (
    <div className="install-panel-content console-content">
      <div className="console-illustration"><Icon name="gamepad" size={42} strokeWidth={1.2} /></div>
      <p className="panel-kicker">{t.consoleShort.toUpperCase()} / STATUS</p>
      <h3>{t.consoleLead}</h3>
      <p>{t.consoleHint}</p>
      <a className="text-link" href={DISCORD_URL} target="_blank" rel="noreferrer"><Icon name="message" size={15} /> Ask in Discord <Icon name="arrow" size={14} /></a>
    </div>
  );
}

function QuickStart({ t }) {
  return (
    <section className="quick-card card-surface">
      <SectionHeading eyebrow={t.quickEyebrow} title={t.quickTitle} />
      <div className="quick-steps">
        <StepRow number="01" title={t.quick1Title}>{t.quick1Detail}</StepRow>
        <StepRow number="02" title={t.quick2Title}>{t.quick2Detail}</StepRow>
        <StepRow number="03" title={t.quick3Title}>{t.quick3Detail}</StepRow>
      </div>
    </section>
  );
}

function PlayerPresence({ t, counts, totalPlayers, hasLiveData }) {
  return (
    <section className="player-presence" aria-label={t.onlinePlayers}>
      <div className="player-presence-head"><span className="eyebrow"><Icon name="activity" size={14} /> {t.playerPulse}</span><strong>{hasLiveData ? totalPlayers : '—'}</strong><small>{t.onlinePlayers}</small></div>
      <div className="player-region-list">
        {regionLinks.filter((region) => region.api).map((region) => <div key={region.code} className="player-region"><span><i className={`player-region-dot ${region.tone}`} />{region.code}</span><strong>{hasLiveData ? (counts[region.code]?.players ?? '—') : '—'}</strong></div>)}
      </div>
    </section>
  );
}

function RulesCard({ t, language }) {
  return (
    <section className="rules-card card-surface" id="rules">
      <p className="eyebrow">{t.statusEyebrow}</p>
      <h2>{t.statusTitle}</h2>
      <p className="card-lead">{t.rulesLead}</p>
      <ul className="rules-list">
        {[t.rule1, t.rule2, t.rule3, t.rule4].map((rule) => <li key={rule}><span><Icon name="shield" size={15} /></span>{rule}</li>)}
      </ul>
      <a className="text-link" href="/policy.html"><Icon name="lock" size={15} /> {t.privacy} <Icon name="arrow" size={14} /></a>
    </section>
  );
}

function SupportCard({ t, language, onWechat }) {
  const contacts = language === 'zh'
    ? [
        { key: 'qq', href: QQ_URL, icon: 'qq', label: t.qq, detail: '975714136 · 点击加入', featured: 'is-qq' },
        { key: 'discord', href: DISCORD_URL, icon: 'discord', label: 'Discord', detail: 'discord.gg/guf9ca4YSA' },
        { key: 'email', href: 'mailto:admin@niko233.top', icon: 'mail', label: t.email, detail: 'admin@niko233.top' },
      ]
    : [
        { key: 'discord', href: DISCORD_URL, icon: 'discord', label: 'Discord', detail: 'discord.gg/guf9ca4YSA', featured: 'is-discord' },
        { key: 'email', href: 'mailto:admin@niko233.top', icon: 'mail', label: t.email, detail: 'admin@niko233.top' },
        { key: 'qq', href: QQ_URL, icon: 'qq', label: t.qq, detail: '975714136' },
      ];

  return (
    <section className="support-card card-surface" id="support">
      <div className="contact-spotlight">
        <div className="contact-spotlight-copy">
          <p className="eyebrow">{t.contact}</p>
          <h2>{t.contactHeadline}</h2>
          <p className="contact-lead">{t.contactLead}</p>
        </div>
        <div className="contact-actions">
          {contacts.map((contact) => <a key={contact.key} className={contact.featured || ''} href={contact.href} target={contact.key === 'email' ? undefined : '_blank'} rel={contact.key === 'email' ? undefined : 'noreferrer'}><img src={`/assets/icons/${contact.icon}.svg`} alt="" /><span><strong>{contact.label}</strong><small>{contact.detail}</small></span><Icon name="arrow" size={17} /></a>)}
        </div>
      </div>
      <div className="support-copy">
        <p className="eyebrow">{t.supportEyebrow}</p>
        <h2>{t.supportTitle}</h2>
        <p className="card-lead">{t.supportLead}</p>
        <div className="support-actions">
          <a className="support-button support-kofi" href="https://ko-fi.com/nikocat233" target="_blank" rel="noreferrer"><img src="/assets/icons/kofi.svg" alt="" />{t.kofi}<Icon name="external" size={14} /></a>
          <button className="support-button support-wechat" type="button" onClick={onWechat}><img src="/assets/icons/wechat.svg" alt="" />{t.wechat}<Icon name="arrow" size={14} /></button>
        </div>
      </div>
    </section>
  );
}

function QRModal({ t, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label={t.modalClose}><Icon name="close" size={18} /></button>
        <div className="qr-modal-copy"><p className="eyebrow">WECHAT / SUPPORT</p><h2 id="qr-title">{t.modalTitle}</h2></div>
        <img src="/wechat.png" alt="WeChat donation QR code" />
        <p>{t.language === 'zh' ? '感谢你的支持。' : 'Thanks for keeping the servers online.'}</p>
      </div>
    </div>
  );
}

function MainPage({ language, setLanguage }) {
  const t = copy[language];
  const [activePlatform, setActivePlatform] = useState('desktop');
  const [openMethod, setOpenMethod] = useState(0);
  const [copied, setCopied] = useState('');
  const [showQr, setShowQr] = useState(false);
  const live = useLiveCounts();

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const input = document.createElement('textarea');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(text);
    window.setTimeout(() => setCopied(''), 1800);
  };

  const switchPlatform = (platform) => {
    setActivePlatform(platform);
    if (platform === 'desktop') setOpenMethod(0);
  };

  return (
    <div className="app-shell" id="top">
      <header className="site-nav shell">
        <a className="brand" href="#top" aria-label="NikoCat233 Impostor Server home"><BrandMark /><span><strong>NikoCat233</strong><small>IMPOSTOR SERVER</small></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#install">{t.navInstall}</a><a href="#mobile">{t.navMobile}</a><a href="#rules">{t.navRules}</a><a href="#support">{t.navSupport}</a>
        </nav>
        <div className="nav-actions"><LanguageToggle language={language} onChange={setLanguage} /><a className="nav-discord" href={language === 'zh' ? QQ_URL : DISCORD_URL} target="_blank" rel="noreferrer"><span>{language === 'zh' ? 'QQ 群' : 'Discord'}</span><Icon name="external" size={15} /></a></div>
      </header>

      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="pulse-dot" /> {t.heroEyebrow}</p>
            <h1>{t.heroTitle}<em>{t.heroTitleAccent}</em></h1>
            <p className="hero-description">{t.heroDescription}</p>
            <div className="hero-actions"><a className="button button-primary" href="#install">{t.heroPrimary}<Icon name="arrow" size={17} /></a><a className="button button-ghost" href={language === 'zh' ? QQ_URL : DISCORD_URL} target="_blank" rel="noreferrer">{t.heroSecondary}<Icon name="external" size={15} /></a></div>
            <p className="hero-footnote"><span>{t.heroFootnote}</span><span className="footnote-line" /><span>{t.heroOrigin}</span></p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-image" />
            <div className="visual-grid" />
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="signal-card"><span className="signal-card-label">{live.hasLiveData ? t.live : t.checking}</span><strong>{live.hasLiveData ? String(live.totalPlayers).padStart(2, '0') : '—'}</strong><small>{t.online}</small><span className="signal-wave"><i /><i /><i /><i /><i /></span></div>
            <div className="visual-caption"><span>AU / CUSTOM-REGION</span><span>37° 46′ 30″ N</span></div>
          </div>
        </section>

        <section className="pulse-strip shell" aria-label="Server overview">
          <div className="pulse-stat"><span className="pulse-stat-icon orange"><Icon name="globe" size={18} /></span><span><strong>04</strong><small>{t.regions}</small></span></div>
          <div className="pulse-stat"><span className="pulse-stat-icon violet"><Icon name="gamepad" size={18} /></span><span><strong>03</strong><small>{t.platforms}</small></span></div>
          <div className="pulse-stat"><span className="pulse-stat-icon green"><Icon name="activity" size={18} /></span><span><strong>{live.hasLiveData ? live.totalPlayers : '—'}</strong><small>{t.online}</small></span></div>
          <div className="pulse-stat"><span className="pulse-stat-icon blue"><Icon name="home" size={18} /></span><span><strong>{live.hasLiveData ? live.totalGames : '—'}</strong><small>{t.rooms}</small></span></div>
          <div className="pulse-note"><span className="pulse-dot" /> <span>{live.hasLiveData ? t.live : t.checking} <small>·</small> Niko233</span></div>
        </section>

        <section className="workspace shell" id="install">
          <div className="main-column">
            <SectionHeading eyebrow={t.installEyebrow} title={t.installTitle} description={t.installDescription} />
            <div className="platform-tabs" role="tablist" aria-label="Platform selection">
              <button type="button" role="tab" aria-selected={activePlatform === 'desktop'} className={activePlatform === 'desktop' ? 'is-active' : ''} onClick={() => switchPlatform('desktop')}><span className="tab-icon"><Icon name="terminal" size={19} /></span><span><strong>{t.desktop}</strong><small>{t.desktopDescription}</small></span>{activePlatform === 'desktop' && <Icon name="arrow" size={16} />}</button>
              <button type="button" role="tab" aria-selected={activePlatform === 'mobile'} className={activePlatform === 'mobile' ? 'is-active' : ''} onClick={() => switchPlatform('mobile')}><span className="tab-icon"><Icon name="phone" size={19} /></span><span><strong>{t.mobile}</strong><small>{t.mobileDescription}</small></span>{activePlatform === 'mobile' && <Icon name="arrow" size={16} />}</button>
              <button type="button" role="tab" aria-selected={activePlatform === 'console'} className={activePlatform === 'console' ? 'is-active' : ''} onClick={() => switchPlatform('console')}><span className="tab-icon"><Icon name="gamepad" size={19} /></span><span><strong>{t.console}</strong><small>{t.consoleDescription}</small></span>{activePlatform === 'console' && <Icon name="arrow" size={16} />}</button>
            </div>
            <div className="install-panel" id="mobile">
              {activePlatform === 'desktop' && <DesktopInstall t={t} language={language} copied={copied} onCopy={copyText} openMethod={openMethod} setOpenMethod={setOpenMethod} />}
              {activePlatform === 'mobile' && <MobileInstall t={t} language={language} counts={live.counts} />}
              {activePlatform === 'console' && <ConsoleInstall t={t} />}
            </div>
          </div>
          <aside className="side-column"><QuickStart t={t} /><div className="side-signal"><span className="eyebrow">{language === 'zh' ? '当前房间' : 'Online games'}</span><div className="mini-radar"><span /><span /><span /></div><div className="mini-signal-copy"><strong>{live.hasLiveData ? `${live.totalGames} active lobbies` : 'Scanning lobbies'}</strong><small>AS · NA · EU · CN1</small></div></div><PlayerPresence t={t} counts={live.counts} totalPlayers={live.totalPlayers} hasLiveData={live.hasLiveData} /></aside>
        </section>

        <section className="lower-grid shell"><RulesCard t={t} language={language} /><SupportCard t={t} language={language} onWechat={() => setShowQr(true)} /></section>
      </main>

      <footer className="site-footer shell"><div className="footer-brand"><BrandMark /><span>{t.footer}</span></div><span className="footer-center">{t.hostedWithLove}</span><a href="/policy.html">{t.footerPolicy} <Icon name="arrow" size={14} /></a></footer>
      {showQr && <QRModal t={{ ...t, language }} onClose={() => setShowQr(false)} />}
    </div>
  );
}

const policyContent = {
  zh: [
    ['1. 简介', '本隐私守则阐述了 NikoCat233 运营的多个《Among Us》Impostor 服务器如何收集、使用和保护您的个人信息。为了确保服务安全、保障玩家体验，以及对抗作弊者和攻击者，我们可能需要收集相关数据。'],
    ['2. 信息收集', '我们收集的信息可能包括但不限于：', ['您连接服务器的 IP 地址', '您的《Among Us》账户信息，包括 productUserId（唯一账户标识）和好友代码', '您的设备信息（由《Among Us》在限制范围内提供给服务器）']],
    ['3. 信息使用和保护', '', ['上述信息仅运营者（NikoCat233）能够直接访问和审查。', '上述信息会被妥善保管，以确保无法被未授权者访问。', '上述信息在必要情况下（例如对抗作弊者和违反规则者）将被披露。']],
    ['4. 知情与同意', '我们已经通过服务器的安装网页与进入服务器时展示的公告向您告知了上述隐私条款。继续在私服游玩意味着您充分了解并认可上述规则，同意我们在合理范围内收集上面描述的隐私信息。如果您拒绝此协议，请立刻退出私服，并从 Among Us 中移除此服务器。'],
    ['5. 变更', '我们可能会不时更新本隐私守则。任何变更将在发布于此页面后立即生效。'],
    ['6. 联系我们', '如果您对本隐私守则有任何疑问，请通过邮件、Discord 或 QQ 群联系我们。'],
  ],
  en: [
    ['1. Introduction', 'This Privacy Policy outlines how NikoCat233, the operator of multiple Among Us Impostor servers, collects, uses, and protects your personal information. To keep the service secure, maintain a stable gaming experience, and combat cheaters and attackers, we may need to collect relevant data.'],
    ['2. Information Collection', 'The information we collect may include, but is not limited to:', ['Your IP address when connecting to our servers', 'Your Among Us account information, including your productUserId and friend code', 'Your device information, provided to the servers by Among Us within permitted limits']],
    ['3. Information Usage and Protection', '', ['The above information can only be directly accessed and reviewed by the operator (NikoCat233).', 'The above information will be securely stored to prevent unauthorized access.', 'The above information will be disclosed when necessary, for example to combat cheaters and rule violators.']],
    ['4. Informed Consent', "We have informed you of these privacy terms through the installation webpage and the announcement displayed when entering the server. Continuing to play on the private server means that you understand and acknowledge the rules and agree that we collect the described privacy information within a reasonable range. If you refuse this agreement, please exit the server and remove it from Among Us."],
    ['5. Changes to this Policy', 'We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting to this page.'],
    ['6. Contact Us', 'If you have questions about this Privacy Policy, please contact us by email, Discord, or QQ group.'],
  ],
};

function PolicyPage({ language, setLanguage }) {
  const t = copy[language];
  return (
    <div className="app-shell policy-shell"><header className="site-nav shell"><a className="brand" href="/"><BrandMark /><span><strong>NikoCat233</strong><small>IMPOSTOR SERVER</small></span></a><div className="nav-actions"><LanguageToggle language={language} onChange={setLanguage} /><a className="nav-discord" href="/">Back home <Icon name="arrow" size={15} /></a></div></header><main className="policy-main shell"><div className="policy-hero"><p className="eyebrow"><Icon name="lock" size={15} /> PRIVACY / TRUST</p><h1>{language === 'zh' ? '隐私守则' : 'Privacy policy'}<em>{language === 'zh' ? ' / Privacy policy' : ' / 隐私守则'}</em></h1><p>{language === 'zh' ? '关于服务器数据如何被收集、使用和保护的说明。' : 'How server data is collected, used, and protected.'}</p></div><article className="policy-card card-surface">{policyContent[language].map(([title, lead, list]) => <section key={title}><h2>{title}</h2>{lead && <p>{lead}</p>}{list && <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}<div className="policy-note"><Icon name="shield" size={17} /><span>{language === 'zh' ? '继续使用私服即代表你理解并接受上述条款。' : 'By continuing to use the private server, you acknowledge and accept these terms.'}</span></div><div className="policy-contact"><a href="mailto:admin@niko233.top"><img src="/assets/icons/mail.svg" alt="" />{t.email}</a><a href={DISCORD_URL} target="_blank" rel="noreferrer"><img src="/assets/icons/discord.svg" alt="" />Discord</a><a href={QQ_URL} target="_blank" rel="noreferrer"><img src="/assets/icons/qq.svg" alt="" />{t.qq}</a></div></article></main><footer className="site-footer shell"><div className="footer-brand"><BrandMark /><span>{t.footer}</span></div><a href="/">{language === 'zh' ? '返回首页' : 'Back home'} <Icon name="arrow" size={14} /></a></footer></div>
  );
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const isPolicyPage = window.location.pathname.toLowerCase().endsWith('policy.html') || new URLSearchParams(window.location.search).get('page') === 'policy';

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem('impostor-language', language);
    } catch {
      // Keep the app usable when storage is unavailable.
    }
  }, [language]);

  return isPolicyPage ? <PolicyPage language={language} setLanguage={setLanguage} /> : <MainPage language={language} setLanguage={setLanguage} />;
}

createRoot(document.getElementById('root')).render(<App />);
