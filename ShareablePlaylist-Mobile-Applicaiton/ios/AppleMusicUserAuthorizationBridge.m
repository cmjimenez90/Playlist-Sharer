//
//  AppleMusicUserAuthorization.m
//  ShareablePlaylistMobile
//
//  Created by Carlos Jimenez on 3/22/20.
//  Copyright © 2020 Facebook. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(AppleMusicUserAuthorization, NSObject)

RCT_EXTERN_METHOD(getUserToken:(NSString *)developerToken callbackFn:(RCTResponseSenderBlock)callbackFn)

@end
