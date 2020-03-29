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
  
 
  let semaphore = DispatchSemaphore(value: 0)
  
  
  @objc func getUserToken(_ developerToken: String, callbackFn: @escaping RCTResponseSenderBlock) {
     let controller = SKCloudServiceController()
     var userToken = ""
     var hasError = false
     var errorMessage = ""
    
  
      let completionHandler: (String?, Error?) -> Void = { [weak self] (token, error) in
          guard error == nil else {
              print("An error occurred when requesting user token: \(error!.localizedDescription)")
            hasError = true
            errorMessage = "An error occurred when requesting user token: \(error!.localizedDescription)"
            self!.semaphore.signal()
              return
          }
          
          guard let token = token else {
              print("Unexpected value from SKCloudServiceController for user token.")
            hasError = true
            errorMessage = "Unexpected value from SKCloudServiceController for user token."
            self!.semaphore.signal()
              return
          }
          
          userToken = token
          self!.semaphore.signal()
        }
    
      if SKCloudServiceController.authorizationStatus() == .authorized {
        
          
          if #available(iOS 11.0, *) {
              controller.requestUserToken(forDeveloperToken: developerToken, completionHandler: completionHandler)
          } else {
              controller.requestPersonalizationToken(forClientToken: developerToken, withCompletionHandler: completionHandler)
          }
          self.semaphore.wait()
          if (hasError == true) {
            callbackFn([errorMessage,NSNull()])
               } else {
            callbackFn([NSNull(),userToken])
          }
      }
      else {
        guard SKCloudServiceController.authorizationStatus() == .notDetermined else { return }
        
        SKCloudServiceController.requestAuthorization{ (authorizationStatus) in
          switch authorizationStatus {
          case .authorized:
            if #available(iOS 11.0, *) {
                controller.requestUserToken(forDeveloperToken: developerToken, completionHandler: completionHandler)
            } else {
                controller.requestPersonalizationToken(forClientToken: developerToken, withCompletionHandler: completionHandler)
            }
            self.semaphore.wait()
            if (hasError == true) {
              callbackFn([errorMessage,NSNull()])
                 } else {
              callbackFn([NSNull(),userToken])
                 }
          default:
            break
        }
      }
      
    }
  }
  
//  @objc func userTokenRequestHandler(_ developerToken: String) {
//        if SKCloudServiceController.authorizationStatus() == .authorized {
//
//        let completionHandler: (String?, Error?) -> Void = { [weak self] (token, error) in
//            guard error == nil else {
//                print("An error occurred when requesting user token: \(error!.localizedDescription)")
//              hasError = true
//              errorMessage = "An error occurred when requesting user token: \(error!.localizedDescription)"
//              semaphore.signal()
//                return
//            }
//
//            guard let token = token else {
//                print("Unexpected value from SKCloudServiceController for user token.")
//              hasError = true
//              errorMessage = "Unexpected value from SKCloudServiceController for user token."
//              self.semaphore.signal()
//                return
//            }
//
//            userToken = token
//            self.semaphore.signal()
//          }
//          
//          if #available(iOS 11.0, *) {
//               controller.requestUserToken(forDeveloperToken: developerToken, completionHandler: completionHandler)
//           } else {
//               controller.requestPersonalizationToken(forClientToken: developerToken, withCompletionHandler: completionHandler)
//           }
//      }
//    }
    
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
