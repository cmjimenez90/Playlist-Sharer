//
//  AppleMusicUserAuthorization.swift
//  ShareablePlaylistMobile
//
//  Created by Carlos Jimenez on 3/22/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import StoreKit

@available(iOS 10.3, *)
@objc(AppleMusicUserAuthorization)
class AppleMusicUserAuthorization : NSObject{
  
  @objc func getUserToken(_ developerToken: String, callbackFn: RCTResponseSenderBlock) {
    let controller = SKCloudServiceController()
    var userToken: String = ""
    var hasError: Bool = false
    var errorMessage : String = ""

    let completionHandler: (String?, Error?) -> Void = { (token, error) in
        guard error == nil else {
          print(error ?? "No ERROR HERE")
          hasError = true
          errorMessage = "Failed to get token for current user"
          return
        }

        guard let token = token else {
            print("Unexpected value from SKCloudServiceController for user token.")
            hasError = true
          errorMessage = "UNKNOWN ERROR"
            return
        }
        print("Setting Token to equal")
        userToken = token
    }
    
    if #available(iOS 11.0, *) {
      controller.requestUserToken(forDeveloperToken: developerToken, completionHandler: completionHandler)
    } else {
      controller.requestPersonalizationToken(forClientToken: developerToken, withCompletionHandler: completionHandler)
    }
    print("call back on way")
    if(hasError){
      callbackFn([errorMessage,NSNull()])
    }else{
      callbackFn([NSNull(),userToken])
    }
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
