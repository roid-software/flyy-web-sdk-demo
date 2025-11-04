import React, { useState } from 'react';
import './App.css';
import FlyySDK from "flyy-web-sdk";
import { CodeBlock, dracula } from "react-code-blocks";

const flyySDK = new FlyySDK();

function Home() {
  const [activeTab, setActiveTab] = useState("code");
    const [partnerId, setPartnerId] = useState("89a3e8bed066cc07268e");
    const [packageName, setPackageName] = useState("com.adityabirlacapitaldigital.OneApp");
    const [environment, setEnvironment] = useState("STAGING");
    const [partnerKey, setPartnerKey] = useState("LZDHf0Fm055M3tOIxDfCKGS5LRdExE9H5eQNYf0c");
    const [userName, setUserName] = useState("");
    const [token, setToken] = useState("");
    const [deviceId, setDeviceId] = useState("");
    const [isCustomQuizPageEnabled, setIsCustomQuizPageEnabled] = useState("YES")
    const [isCustomLogoEnabled, setIsCustomLogoEnabled] = useState("YES")
    const [isTitle, setIsTitle] = useState("Thank You")
    const [isDescription, setIsDescription] = useState("You are wise in your financial decisions.")
    const [isDescriptionColour, setIsDescriptionColour] = useState("#808080")
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
    const [isDarkTheme, setIsDarkTheme] = useState(false);

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
    ext_user_token: "nAlyijFANB",
    attachMode: "popup",
    //attachMode: 'drawer',
    environment: environment,
    device_id: "flyy-demo-app",
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
      }

      // Set SDK configurations
      flyySDK.setActionButtonPosition("left");
      flyySDK.setActionButtonColor("#faa232");
      flyySDK.setActionButtonText("Reward Points");

      // Set theme colors
      flyySDK.setFlyyThemeColor({
        topBgColor: "#a52b2b",
        mainBgColor: "#e8f00c",
        shadowBgColor: "#1d2678",
        offersCardBgColor: "#0cf010",
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

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <section className="bg-white rounded-lg shadow-sm mb-8 p-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">Installation</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Install the Flyy Web SDK package using npm:
            </p>
          </div>
          <div className="bg-gray-900 rounded-md p-5 mb-5">
            <CodeBlock 
              text={"npm install flyy-web-sdk"} 
              language="bash"
              theme={dracula}
              showLineNumbers={false}
            />
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm mb-8 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">Getting Started</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Initialize the Flyy SDK with your configuration:
          </p>
          <div className="bg-gray-900 rounded-md p-5">
            <CodeBlock
              text={code}
              language={language}
              showLineNumbers={true}
              theme={dracula}
            />
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm mb-8 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Configuration</h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Configure your Flyy SDK settings below:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">
                Partner ID:
              </label>
              <input
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Package Name:</label>
              <input
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Environment:</label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm bg-white cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="STAGING">STAGING</option>
                <option value="PRODUCTION">PRODUCTION</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Show Custom Quiz Page:</label>
              <select
                value={isCustomQuizPageEnabled}
                onChange={(e) => setIsCustomQuizPageEnabled(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm bg-white cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Show Custom Logo:</label>
              <select
                value={isCustomLogoEnabled}
                onChange={(e) => setIsCustomLogoEnabled(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm bg-white cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Thank You Title:</label>
              <input
                value={isTitle}
                onChange={(e) => setIsTitle(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Thank You Description:</label>
              <input
                value={isDescription}
                onChange={(e) => setIsDescription(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Button Text Colour:</label>
              <input
                type="color"
                value={isButtonTextColour}
                onChange={(e) => setIsButtonTextColour(e.target.value)}
                className="flex-1 p-1 h-10 rounded-md border border-gray-300 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Button Background Colour:</label>
              <input
                type="color"
                value={isButtonColour}
                onChange={(e) => setIsButtonColour(e.target.value)}
                className="flex-1 p-1 h-10 rounded-md border border-gray-300 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Seekbar Colour:</label>
              <input
                type="color"
                value={isSeekbarColour}
                onChange={(e) => setIsSeekbarColour(e.target.value)}
                className="flex-1 p-1 h-10 rounded-md border border-gray-300 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Selected Option Border Colour:</label>
              <input
                type="color"
                value={isSelectedColour}
                onChange={(e) => setIsSelectedColour(e.target.value)}
                className="flex-1 p-1 h-10 rounded-md border border-gray-300 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Description Colour:</label>
              <input
                type="color"
                value={isDescriptionColour}
                onChange={(e) => setIsDescriptionColour(e.target.value)}
                className="flex-1 p-1 h-10 rounded-md border border-gray-300 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Primary Text Colour:</label>
              <input
                type="color"
                value={isTitleColour}
                onChange={(e) => setIsTitleColour(e.target.value)}
                className="flex-1 p-1 h-10 rounded-md border border-gray-300 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Referral History Info Message:</label>
              <input
                value={referralInfoMsg}
                onChange={(e) => setReferralInfoMsg(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="font-semibold text-gray-700 text-sm min-w-[180px] text-left">Referral History Message:</label>
              <input
                value={referralHistoryMessage}
                onChange={(e) => setReferralHistoryMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {environment === "STAGING" && (
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <label style={{ 
                  fontWeight: "600", 
                  color: "#555",
                  fontSize: "14px",
                  minWidth: "180px",
                  textAlign: "left"
                }}>Partner Key:</label>
                <input
                  value={partnerKey}
                  onChange={(e) => setPartnerKey(e.target.value)}
                  style={{ 
                    flex: 1,
                    padding: "10px 15px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    transition: "border-color 0.3s",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#007bff"}
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
                />
              </div>
            )}
            {environment === "PRODUCTION" && (
              <>
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <label style={{ 
                    fontWeight: "600", 
                    color: "#555",
                    fontSize: "14px",
                    minWidth: "180px",
                    textAlign: "left"
                  }}>Token:</label>
                  <input
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    style={{ 
                      flex: 1,
                      padding: "10px 15px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      fontSize: "14px",
                      transition: "border-color 0.3s",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#007bff"}
                    onBlur={(e) => e.target.style.borderColor = "#ddd"}
                  />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <label style={{ 
                    fontWeight: "600", 
                    color: "#555",
                    fontSize: "14px",
                    minWidth: "180px",
                    textAlign: "left"
                  }}>Device ID:</label>
                  <input
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    style={{ 
                      flex: 1,
                      padding: "10px 15px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      fontSize: "14px",
                      transition: "border-color 0.3s",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#007bff"}
                    onBlur={(e) => e.target.style.borderColor = "#ddd"}
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-between col-span-full">
              <label className="font-semibold text-gray-700 text-sm mr-2.5">
                Dark Theme Enable
              </label>
              <input
                type="checkbox"
                checked={isDarkTheme}
                onChange={(e) =>
                  setIsDarkTheme(e.target.checked ? true : false)
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm mb-8 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">Initialize Flyy</h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Enter a user ID to generate a token and initialize the Flyy SDK:
          </p>
          <div className="flex gap-4 items-center max-w-lg">
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Enter user ID"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => {
                startFlyy();
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-md text-base font-medium cursor-pointer transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Initialize Flyy
            </button>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm mb-8 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">API Testing</h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Test the Flyy SDK API methods:
          </p>
          
          <div className="mb-5">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Get Product Details</h3>
            <div className="flex gap-4 items-center max-w-2xl">
              <input
                value={productKey}
                onChange={(e) => setProductKey(e.target.value)}
                placeholder="Enter Product Key"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={() => flyySDK.getProductDetails(productKey)}
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get Product Details
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-gray-700 mb-4">Verify Product Code</h3>
            <div className="flex gap-4 items-center max-w-4xl">
              <input
                value={passReferrer}
                onChange={(e) => setPassReferrer(e.target.value)}
                placeholder="Enter Referrer Key"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                value={passDeviceID}
                onChange={(e) => setPassDeviceID(e.target.value)}
                placeholder="Enter Device ID"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={() =>
                  flyySDK.verifyProductCode(passReferrer, passDeviceID)
                }
                disabled={loading}
                className="px-6 py-3 bg-orange-600 text-white rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Product Details
              </button>
            </div>
          </div>
        </section>

        <section className="bg-slate-800 rounded-lg border border-slate-700 mb-8 p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">SDK Methods</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Available methods to interact with Flyy SDK features:
          </p>
          <div className="flex flex-col gap-5">
            {sdkMethods.map((method, index) => (
              <div key={index} className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  {/* Left side - Title and Description */}
                  <div className="p-6 lg:p-8 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-slate-700">
                    <h3 className="text-xl font-semibold text-white">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {method.description}
                    </p>
                    <button
                      onClick={method.onClick}
                      className="mt-auto self-start px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      {method.buttonText}
                    </button>
                  </div>

                  {/* Right side - Code section */}
                  <div className="flex flex-col bg-slate-800">
                    {/* Code Header */}
                    <div className="px-5 py-3 border-b border-slate-700 flex items-center gap-2">
                      <span className="text-sm text-gray-400 font-medium">
                        Code
                      </span>
                    </div>
                    
                    {/* Code Content */}
                    <div className="p-5 bg-gray-900 flex-1 flex items-center">
                      <code className="text-cyan-400 text-sm font-mono">
                        {method.method}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;