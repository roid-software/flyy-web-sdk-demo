import React, { useState, useEffect } from 'react';
import './App.css';
import FlyySDK from "flyy-web-sdk-staging";
import { CodeBlock, dracula } from "react-code-blocks";

const flyySDK = new FlyySDK();

const EVENT_DB_NAME = "flyy_demo_db";
const EVENT_STORE = "user_events";

const openEventDB = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(EVENT_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(EVENT_STORE)) {
        db.createObjectStore(EVENT_STORE, { keyPath: "id", autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const saveEventRecord = async (record) => {
  const db = await openEventDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(EVENT_STORE, "readwrite");
    tx.objectStore(EVENT_STORE).add(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

const getEventRecords = async () => {
  const db = await openEventDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(EVENT_STORE, "readonly");
    const request = tx.objectStore(EVENT_STORE).getAll();
    request.onsuccess = () => resolve(request.result.reverse());
    request.onerror = () => reject(request.error);
  });
};

const NAV_SECTIONS = [
  { id: "installation", label: "Installation" },
  { id: "getting-started", label: "Getting started" },
  { id: "configuration", label: "Configuration" },
  { id: "initialize", label: "Initialize SDK" },
  { id: "api-playground", label: "API playground" },
  { id: "sdk-methods", label: "SDK methods" },
];

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 focus:border-emerald-700";

const labelClass = "block text-[13px] font-medium text-gray-700 mb-1.5";

const primaryBtnClass =
  "inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-800 text-white text-sm font-semibold cursor-pointer shadow-sm transition-colors duration-150 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 disabled:opacity-50 disabled:cursor-not-allowed";

const secondaryBtnClass =
  "inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white text-gray-800 text-sm font-semibold cursor-pointer border border-gray-300 shadow-sm transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/40";

function Home() {
    const [partnerId, setPartnerId] = useState(import.meta.env.VITE_FLYY_PARTNER_ID || "");
    const [packageName, setPackageName] = useState(import.meta.env.VITE_FLYY_PACKAGE_NAME || "");
    const [environment, setEnvironment] = useState(import.meta.env.VITE_FLYY_LOCAL_ENV || "STAGING");
    const [partnerKey, setPartnerKey] = useState(import.meta.env.VITE_FLYY_PARTNER_KEY || "");
    const [userName, setUserName] = useState(import.meta.env.VITE_FLYY_DEFAULT_USER || "");
    const [token, setToken] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [isCustomQuizPageEnabled, setIsCustomQuizPageEnabled] = useState("YES")
    const [isCustomLogoEnabled, setIsCustomLogoEnabled] = useState("YES")
    const [isTitle, setIsTitle] = useState("Thank You")
    const [isDescription, setIsDescription] = useState("You are wise in your financial decisions.")
    const [isDescriptionColour, setIsDescriptionColour] = useState("#1D2678") // 808080
    const [isTitleColour, setIsTitleColour] = useState("#000000")
    const [isButtonTextColour, setIsButtonTextColour] = useState("#FFFFFF")
    const [isButtonColour, setIsButtonColour] = useState("#C7222A")
    const [isSeekbarColour, setIsSeekbarColour] = useState("#0A6A34")
    const [isSelectedColour, setIsSelectedColour] = useState("#C7222A")
    const [referralInfoMsg, setReferralInfoMsg] = useState("")
    const [referralHistoryMessage, setReferralHistoryMessage] = useState("")
    const [productKey, setProductKey] = useState("");
    const [loading] = useState(false);
    const [passReferrer, setPassReferrer] = useState("")
    const [passDeviceID, setPassDeviceID] = useState("")
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [eventKey, setEventKey] = useState("300");
    const [eventData, setEventData] = useState('{\n    "amount": 1791\n}');
    const [eventLoading, setEventLoading] = useState(false);
    const [eventHistory, setEventHistory] = useState([]);
    const [isEventDrawerOpen, setIsEventDrawerOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(NAV_SECTIONS[0].id);
    const [extUserToken, setExtUserToken] = useState("");
    const [resolvedDeviceId, setResolvedDeviceId] = useState("flyy-demo-app");

    useEffect(() => {
      getEventRecords()
        .then(setEventHistory)
        .catch((e) => console.error("Error loading event history:", e));
    }, []);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) {
            setActiveSection(visible[0].target.id);
          }
        },
        { rootMargin: "-80px 0px -60% 0px" }
      );
      NAV_SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
      return () => observer.disconnect();
    }, []);

  const sdkMethods = [
     {
      title: "Offers",
      description: "Opens the Offers screen",
      method: "flyySDK.clickToOpenSDK(data)",
      onClick: () => flyySDK.clickToOpenSDK(data),
      buttonText: "Open Offers"
    },
    {
      title: "Wallet",
      description: "Opens the Wallet screen",
      method: "flyySDK.openWalletScreen()",
      onClick: () => flyySDK.openWalletScreen(),
      buttonText: "Open Wallet"
    },
    {
      title: "Invite & Earn QR",
      description: "Opens the Invite & Earn QR screen",
      method: "flyySDK.openInviteQRScreen(data)",
      onClick: () => flyySDK.openNewInviteScreen(data),
      buttonText: "Open Invite & Earn QR"
    },
    {
      title: "Poll List",
      description: "Opens the Poll List screen",
      method: "flyySDK.openPollList(data)",
      onClick: () => flyySDK.openPollListScreen(data),
      buttonText: "Open Poll List"
    },
    {
      title: "Survey List",
      description: "Opens the Survey List screen",
      method: "flyySDK.openSurveyList(data)",
      onClick: () => flyySDK.openSurveyListScreen(data),
      buttonText: "Open Survey List"
    },
    {
      title: "Trivia List",
      description: "Opens the Trivia List screen",
      method: "flyySDK.openTriviaList(data)",
      onClick: () => flyySDK.openTriviaListScreen(data),
      buttonText: "Open Trivia List"
    },
    {
      title: "Spin Wheel",
      description: "Opens the Spin the Wheel screen (requires live offer)",
      method: "flyySDK.openSpinTheWheel()",
      onClick: () => flyySDK.openSpinTheWheel(),
      buttonText: "Open Spin Wheel"
    },
    {
      title: "Account",
      description: "Opens the Account screen",
      method: "flyySDK.openRedeemScreen()",
      onClick: () => flyySDK.openRedeemScreen(),
      buttonText: "Open Account"
    },
    {
      title: "Rewards",
      description: "Opens the User Rewards screen",
      method: "flyySDK.openRewardsScreen()",
      onClick: () => flyySDK.openRewardsScreen(),
      buttonText: "Open Rewards"
    },
    {
      title: "Gift Cards",
      description: "Opens the Gift Cards Redemption screen",
      method: "flyySDK.openGiftCardsScreen()",
      onClick: () => flyySDK.openGiftCardsScreen(),
      buttonText: "Open Gift Cards"
    },
    {
      title: "Tournaments",
      description: "Opens the Games and Tournaments screen",
      method: "flyySDK.openTournamentsScreen()",
      onClick: () => flyySDK.openTournamentsScreen(),
      buttonText: "Open Tournaments"
    },
    {
      title: "Referrals",
      description: "Opens the Referrals screen with unique referral code",
      method: "flyySDK.openReferralscreen()",
      onClick: () => flyySDK.openReferralscreen(),
      buttonText: "Open Referrals"
    },
    {
      title: "Quiz Zone",
      description: "Opens the Quiz Listing screen",
      method: "flyySDK.openQuizZoneScreen()",
      onClick: () => flyySDK.openQuizZoneScreen(),
      buttonText: "Open Quiz Zone"
    },
    {
      title: "Cash Transactions",
      description: "Opens Transactions screen for Cash",
      method: "flyySDK.openTransactionsScreen('Cash')",
      onClick: () => flyySDK.openTransactionsScreen("Cash"),
      buttonText: "Open Cash Transactions"
    },
    {
      title: "Points History",
      description: "Opens Transactions screen for Coins",
      method: "flyySDK.openTransactionsScreen('Coins')",
      onClick: () => flyySDK.openTransactionsScreen("Coins"),
      buttonText: "Open Points History"
    },
    {
      title: "Invite and Earn",
      description: "Opens Invite and Earn screen (requires live offer)",
      method: "flyySDK.openInviteAndEarnOffer()",
      onClick: () => flyySDK.openInviteAndEarnOffer(),
      buttonText: "Open Invite and Earn"
    },
    {
      title: "Daily Check-In",
      description: "Opens Daily Check-In screen (requires live offer)",
      method: "flyySDK.openDailyCheckInOffer()",
      onClick: () => flyySDK.openDailyCheckInOffer(),
      buttonText: "Open Daily Check-In"
    }
  ];

  flyySDK.startReferralTracking();

  var data = {
    package_name: packageName,
    partner_id: partnerId,
    ext_user_token: extUserToken,
    attachMode: "popup",
    //attachMode: 'drawer',
    environment: environment,
    device_id: resolvedDeviceId,
    isCustomQuizPageEnabled: isCustomQuizPageEnabled,
    isCustomQuizLogoEnabled: isCustomLogoEnabled,
    isTitle: isTitle,
    isDescription: isDescription,
    isDescriptionColour: isDescriptionColour,
    isTitleColour: isTitleColour,
    isButtonTextColour: isButtonTextColour,
    isButtonColour: isButtonColour,
    isSeekbarColour: isSeekbarColour,
    isSelectedColour: isSelectedColour,
    referralInfoMsg: referralInfoMsg,
    referralHistoryMessage: referralHistoryMessage,
    userName: userName,
    passReferrer: passReferrer,
    passDeviceID: passDeviceID,
    isDarkTheme: isDarkTheme,
    logoUrl: "https://growth-stage.theflyy.com/images/logo-colored.png"
  };

  const code = `const flyySDK = new FlyySDK();

    call this in your token fetch call
    var data = {
        package_name: "<Your-Package-name>",
        partner_id: "<your-partner-id>",
        ext_user_token: "<user-token-from-partner-api>",
        attachMode: 'popup',
        //attachMode: 'drawer',
        //attachMode: 'chatbox',
        //attachMode: 'embed',s
        environment: "STAGING"
    };
    (function () {
        //If the attachMode is Chatbox;
        flyySDK.setActionButtonPosition('left');
        flyySDK.setActionButtonColor('#faa232');
        flyySDK.setActionButtonText('Reward Points');
        flyySDK.setUserName("user name set by method");
        flyySDK.setUserBankCredntials({acc_type: "upi/bank", upi_id: "<upi_id>", "acc_num": "", "ifsc": "", "name":""})
        flyySDK.init(JSON.stringify(data));
    })();   `;

  const language = "js";

  const startFlyy = async () => {
    console.log({ data });
    if (!partnerId) {
      alert("Please enter Partner ID");
      return;
    }
    if (environment === "STAGING" && !partnerKey) {
      alert("Please enter Partner Key");
      return;
    }
    if (environment === "PRODUCTION" && (!token || !deviceId)) {
      alert("Please enter Token and Device ID for PRODUCTION environment");
      return;
    }

    console.log("BODY USERNAME : ", userName);

    try {
      // Prepare token & device_id
      if (environment === "PRODUCTION") {
        data.ext_user_token = token;
        data.device_id = deviceId;
        setExtUserToken(token);
        setResolvedDeviceId(deviceId);
      } else {
        const baseUrl = "https://stage-partner-api.theflyy.com/v1";
        const response = await fetch(
          `${baseUrl}/${partnerId}/user/${userName}/user_token`,
          {
            method: "POST",
            headers: {
              "partner-key": partnerKey,
              "content-type": "application/json",
            },
            body: JSON.stringify({ is_new: "false", username: userName }),
          }
        );

        const res = await response.json();
        data.ext_user_token = res.token;
        data.device_id = res.device_id;
        setExtUserToken(res.token);
        setResolvedDeviceId(res.device_id);
      }

      // Set SDK configurations
      flyySDK.setActionButtonPosition("left");
      flyySDK.setActionButtonColor("#faa232");
      flyySDK.setActionButtonText("Reward Points");

      // Set theme colors
      flyySDK.setFlyyThemeColor({
        topBgColor: "#e8f00c",
        mainBgColor: "#e8f00c",
        shadowBgColor: "#1d2678",
        offersCardBgColor: "#e8f00c",
        buttonBGColor: "#2B49A5",
        headingTextColor: "#ed6028",
        subHeadingTextColor: "#000000",
        extraTextColor: "#585957",
        labelsTextColor: "#000000",
        walletCardColor: "#d028ed",
        walletInnerCardColor: "#28d9ed",
        walletSubHeadingColor: "#000000",
        scratchCardBgColor: "#f55302",
        scratchCardInnerColor: "#0cf0e5",
      });

      // Set user info
      flyySDK.setUserName(userName);
      flyySDK.setUserBankCredntials({ acc_type: "upi", upi_id: "vinuyer@ybl" });

      // Initialize SDK
      flyySDK.init(JSON.stringify(data));
    } catch (error) {
      console.error("Error initializing Flyy:", error);
      alert(
        "Failed to initialize Flyy. Please check your configuration and try again."
      );
    }
  };

  const sendUserEvent = async () => {
    if (!partnerId || !partnerKey) {
      alert("Please enter Partner ID and Partner Key");
      return;
    }
    if (!userName) {
      alert("Please enter user ID");
      return;
    }
    if (!eventKey) {
      alert("Please enter Event Key");
      return;
    }

    let parsedEventData;
    try {
      parsedEventData = JSON.parse(eventData);
    } catch (e) {
      alert("Event Data is not valid JSON");
      return;
    }

    setEventLoading(true);
    const requestBody = {
      ext_user_id: userName,
      event_key: eventKey,
      event_data: parsedEventData,
    };
    const record = {
      ext_user_id: userName,
      request: requestBody,
      response: null,
      status: null,
      created_at: new Date().toISOString(),
    };
    try {
      const response = await fetch(
        `https://stage-partner-api.theflyy.com/v5/${partnerId}/user_event`,
        {
          method: "POST",
          headers: {
            "PARTNER-KEY": partnerKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      record.status = response.status;
      record.response = await response.json();
    } catch (error) {
      console.error("Error sending user event:", error);
      record.status = "NETWORK_ERROR";
      record.response = { error: String(error) };
    }
    try {
      await saveEventRecord(record);
      setEventHistory(await getEventRecords());
    } catch (dbError) {
      console.error("Error saving event record:", dbError);
      setEventHistory((prev) => [record, ...prev]);
    }
    setIsEventDrawerOpen(true);
    setEventLoading(false);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">

        {/* Sidebar navigation */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200">
          <nav className="sticky top-20 py-10 pr-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3 px-3">
              Web SDK
            </p>
            <ul className="flex flex-col gap-0.5">
              {NAV_SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors duration-150 ${
                      activeSection === id
                        ? "bg-emerald-50 text-emerald-900 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            {environment === "STAGING" && (
              <div className="mt-6 px-3">
                <button
                  onClick={() => setIsEventDrawerOpen(true)}
                  className="w-full text-left text-[13px] font-medium text-gray-600 hover:text-gray-900 cursor-pointer flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                >
                  Event history
                  <span className="text-[11px] font-semibold bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">
                    {eventHistory.length}
                  </span>
                </button>
              </div>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 py-10 lg:pl-12 max-w-3xl">

          {/* Page header */}
          <div className="mb-12 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-3">
              <span>Docs</span>
              <span className="text-gray-300">/</span>
              <span>Web SDK</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Getting started</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
              Flyy Web SDK
            </h1>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
              Embed gamified rewards, referrals, and engagement campaigns in your web app.
              Configure the SDK, initialize it for a user, and explore every screen from this playground.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  environment === "STAGING"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${environment === "STAGING" ? "bg-amber-500" : "bg-emerald-500"}`} />
                {environment}
              </span>
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                v5 Partner API
              </span>
            </div>
          </div>

          {/* Installation */}
          <section id="installation" className="mb-14 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">Installation</h2>
            <p className="text-[15px] text-gray-600 mb-5 leading-relaxed">
              Install the Flyy Web SDK package from npm:
            </p>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-medium text-gray-500">Terminal</span>
              </div>
              <div className="bg-[#282a36] p-4">
                <CodeBlock
                  text={"npm install flyy-web-sdk"}
                  language="bash"
                  theme={dracula}
                  showLineNumbers={false}
                />
              </div>
            </div>
          </section>

          {/* Getting started */}
          <section id="getting-started" className="mb-14 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">Getting started</h2>
            <p className="text-[15px] text-gray-600 mb-5 leading-relaxed">
              Initialize the SDK after fetching a user token from the Partner API:
            </p>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-medium text-gray-500">JavaScript</span>
              </div>
              <div className="bg-[#282a36] p-4">
                <CodeBlock
                  text={code}
                  language={language}
                  showLineNumbers={true}
                  theme={dracula}
                />
              </div>
            </div>
          </section>

          {/* Configuration */}
          <section id="configuration" className="mb-14 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">Configuration</h2>
            <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
              These values feed the <code className="text-[13px] bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md font-mono">data</code> object
              passed to <code className="text-[13px] bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md font-mono">flyySDK.init()</code>.
            </p>

            <div className="rounded-xl border border-gray-200 divide-y divide-gray-200">
              {/* Credentials group */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Credentials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Partner ID</label>
                    <input
                      value={partnerId}
                      onChange={(e) => setPartnerId(e.target.value)}
                      className={`${inputClass} font-mono`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Package name</label>
                    <input
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                      className={`${inputClass} font-mono`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Environment</label>
                    <select
                      value={environment}
                      onChange={(e) => setEnvironment(e.target.value)}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="STAGING">STAGING</option>
                      <option value="PRODUCTION">PRODUCTION</option>
                    </select>
                  </div>
                  {environment === "STAGING" && (
                    <div>
                      <label className={labelClass}>Partner key</label>
                      <input
                        value={partnerKey}
                        onChange={(e) => setPartnerKey(e.target.value)}
                        className={`${inputClass} font-mono`}
                      />
                    </div>
                  )}
                  {environment === "PRODUCTION" && (
                    <>
                      <div>
                        <label className={labelClass}>Token</label>
                        <input
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          className={`${inputClass} font-mono`}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Device ID</label>
                        <input
                          value={deviceId}
                          onChange={(e) => setDeviceId(e.target.value)}
                          className={`${inputClass} font-mono`}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quiz group */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Quiz page</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Show custom quiz page</label>
                    <select
                      value={isCustomQuizPageEnabled}
                      onChange={(e) => setIsCustomQuizPageEnabled(e.target.value)}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="YES">Yes</option>
                      <option value="NO">No</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Show custom logo</label>
                    <select
                      value={isCustomLogoEnabled}
                      onChange={(e) => setIsCustomLogoEnabled(e.target.value)}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="YES">Yes</option>
                      <option value="NO">No</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Thank you title</label>
                    <input
                      value={isTitle}
                      onChange={(e) => setIsTitle(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Thank you description</label>
                    <input
                      value={isDescription}
                      onChange={(e) => setIsDescription(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Theme group */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Theme colours</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {[
                    ["Button text", isButtonTextColour, setIsButtonTextColour],
                    ["Button background", isButtonColour, setIsButtonColour],
                    ["Seekbar", isSeekbarColour, setIsSeekbarColour],
                    ["Selected option border", isSelectedColour, setIsSelectedColour],
                    ["Description", isDescriptionColour, setIsDescriptionColour],
                    ["Primary text", isTitleColour, setIsTitleColour],
                  ].map(([label, value, setter]) => (
                    <div key={label}>
                      <label className={labelClass}>{label}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => setter(e.target.value)}
                          className="w-9 h-9 p-0.5 rounded-lg border border-gray-300 cursor-pointer bg-white shadow-sm"
                        />
                        <span className="text-xs font-mono text-gray-500 uppercase">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referral + misc group */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Referrals & appearance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Referral history info message</label>
                    <input
                      value={referralInfoMsg}
                      onChange={(e) => setReferralInfoMsg(e.target.value)}
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Referral history message</label>
                    <input
                      value={referralHistoryMessage}
                      onChange={(e) => setReferralHistoryMessage(e.target.value)}
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <input
                      id="dark-theme-toggle"
                      type="checkbox"
                      checked={isDarkTheme}
                      onChange={(e) => setIsDarkTheme(e.target.checked ? true : false)}
                      className="w-4 h-4 cursor-pointer accent-emerald-700"
                    />
                    <label htmlFor="dark-theme-toggle" className="text-sm text-gray-700 cursor-pointer">
                      Enable dark theme
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Initialize */}
          <section id="initialize" className="mb-14 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">Initialize SDK</h2>
            <p className="text-[15px] text-gray-600 mb-5 leading-relaxed">
              Enter a user ID — a token is fetched from the Partner API and the SDK boots for that user.
            </p>
            <div className="rounded-xl border border-gray-200 p-6">
              <label className={labelClass}>User ID</label>
              <div className="flex gap-3 items-center max-w-lg">
                <input
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  placeholder="e.g. tds_user1"
                  className={inputClass}
                />
                <button
                  onClick={() => {
                    startFlyy();
                  }}
                  className={`${primaryBtnClass} whitespace-nowrap`}
                >
                  Initialize Flyy
                </button>
              </div>
            </div>
          </section>

          {/* API playground */}
          <section id="api-playground" className="mb-14 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">API playground</h2>
            <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
              Exercise SDK and Partner API calls against the current configuration.
            </p>

            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-gray-200 p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Get product details</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Look up a product by its key.
                </p>
                <div className="flex gap-3 items-center max-w-xl">
                  <input
                    value={productKey}
                    onChange={(e) => setProductKey(e.target.value)}
                    placeholder="Product key"
                    className={inputClass}
                  />
                  <button
                    onClick={() => flyySDK.getProductDetails(productKey)}
                    disabled={loading}
                    className={`${primaryBtnClass} whitespace-nowrap`}
                  >
                    Get details
                  </button>
                </div>
              </div>

              {environment !== "PRODUCTION"  && (
                <div className="rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-gray-900">Send user event</h3>
                    <span className="text-[11px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Staging only
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Fires <code className="text-[12px] bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md font-mono">POST /v5/&#123;partner_id&#125;/user_event</code> for
                    the user ID above. Every call is stored locally — open the event history to inspect requests and responses.
                  </p>
                  <div className="flex flex-col gap-4 max-w-xl">
                    <div>
                      <label className={labelClass}>Event key</label>
                      <input
                        value={eventKey}
                        onChange={(e) => setEventKey(e.target.value)}
                        placeholder="e.g. 300"
                        className={`${inputClass} font-mono`}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Event data (JSON)</label>
                      <textarea
                        value={eventData}
                        onChange={(e) => setEventData(e.target.value)}
                        placeholder='{"amount": 1791}'
                        rows={4}
                        className={`${inputClass} font-mono resize-y`}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={sendUserEvent}
                        disabled={eventLoading}
                        className={primaryBtnClass}
                      >
                        {eventLoading ? "Sending…" : "Send user event"}
                      </button>
                      <button
                        onClick={() => setIsEventDrawerOpen(true)}
                        className={secondaryBtnClass}
                      >
                        Event history ({eventHistory.length})
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-gray-200 p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Verify product code</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Validate a referrer key against a device ID.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center max-w-2xl">
                  <input
                    value={passReferrer}
                    onChange={(e) => setPassReferrer(e.target.value)}
                    placeholder="Referrer key"
                    className={inputClass}
                  />
                  <input
                    value={passDeviceID}
                    onChange={(e) => setPassDeviceID(e.target.value)}
                    placeholder="Device ID"
                    className={inputClass}
                  />
                  <button
                    onClick={() =>
                      flyySDK.verifyProductCode(passReferrer, passDeviceID)
                    }
                    disabled={loading}
                    className={`${primaryBtnClass} whitespace-nowrap`}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SDK methods */}
          <section id="sdk-methods" className="mb-14 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">SDK methods</h2>
            <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
              Every screen the SDK can open. Initialize the SDK first, then try each method.
            </p>
            <div className="rounded-xl border border-gray-200 divide-y divide-gray-200">
              {sdkMethods.map((method, index) => (
                <div key={index} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-gray-900 mb-0.5">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {method.description}
                    </p>
                    <code className="inline-block text-[12px] bg-gray-100 text-emerald-900 px-2 py-1 rounded-md font-mono">
                      {method.method}
                    </code>
                  </div>
                  <button
                    onClick={method.onClick}
                    className={`${secondaryBtnClass} whitespace-nowrap shrink-0`}
                  >
                    {method.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      {/* Event history drawer */}
      {isEventDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsEventDrawerOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border-l border-gray-200 ${
          isEventDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-base font-semibold text-gray-900">User event history</h3>
            <p className="text-xs text-gray-500">Stored locally in your browser</p>
          </div>
          <button
            onClick={() => setIsEventDrawerOpen(false)}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50">
          {eventHistory.length === 0 && (
            <div className="text-center py-16 px-6">
              <p className="text-sm font-medium text-gray-900 mb-1">No events yet</p>
              <p className="text-sm text-gray-500">
                Send a user event from the API playground and it will show up here with its request and response.
              </p>
            </div>
          )}
          {eventHistory.map((event, index) => (
            <div
              key={event.id ?? index}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div>
                  <span className="text-sm font-semibold text-gray-900">
                    {event.ext_user_id}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {new Date(event.created_at).toLocaleString()}
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    event.status === 200
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Request</p>
                <pre className="bg-[#282a36] text-cyan-300 text-xs rounded-lg p-3 overflow-x-auto mb-3">
                  {JSON.stringify(event.request, null, 2)}
                </pre>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Response</p>
                <pre className="bg-[#282a36] text-emerald-300 text-xs rounded-lg p-3 overflow-x-auto">
                  {JSON.stringify(event.response, null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
