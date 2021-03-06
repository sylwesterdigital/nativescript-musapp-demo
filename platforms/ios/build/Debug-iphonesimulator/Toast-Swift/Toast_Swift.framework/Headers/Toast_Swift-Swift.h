// Generated by Apple Swift version 5.3.1 (swiftlang-1200.0.41 clang-1200.0.32.8)
#ifndef TOAST_SWIFT_SWIFT_H
#define TOAST_SWIFT_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#include <Foundation/Foundation.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import CoreGraphics;
@import Foundation;
@import ObjectiveC;
@import UIKit;
#endif

#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="Toast_Swift",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

@class ToastStyle;
enum ToastPosition : NSInteger;

/// <code>ToastManager</code> provides general configuration options for all toast
/// notifications. Backed by a singleton instance.
SWIFT_CLASS_NAMED("ToastManager")
@interface ToastManager : NSObject
/// The <code>ToastManager</code> singleton instance.
SWIFT_CLASS_PROPERTY(@property (nonatomic, class, readonly, strong) ToastManager * _Nonnull shared;)
+ (ToastManager * _Nonnull)shared SWIFT_WARN_UNUSED_RESULT;
/// The shared style. Used whenever toastViewForMessage(message:title:image:style:) is called
/// with with a nil style.
@property (nonatomic, strong) ToastStyle * _Nonnull style;
/// Enables or disables tap to dismiss on toast views. Default is <code>true</code>.
@property (nonatomic) BOOL isTapToDismissEnabled;
/// Enables or disables queueing behavior for toast views. When <code>true</code>,
/// toast views will appear one after the other. When <code>false</code>, multiple toast
/// views will appear at the same time (potentially overlapping depending
/// on their positions). This has no effect on the toast activity view,
/// which operates independently of normal toast views. Default is <code>false</code>.
@property (nonatomic) BOOL isQueueEnabled;
/// The default duration. Used for the <code>makeToast</code> and
/// <code>showToast</code> methods that don’t require an explicit duration.
/// Default is 3.0.
@property (nonatomic) NSTimeInterval duration;
/// Sets the default position. Used for the <code>makeToast</code> and
/// <code>showToast</code> methods that don’t require an explicit position.
/// Default is <code>ToastPosition.Bottom</code>.
@property (nonatomic) enum ToastPosition position;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end

typedef SWIFT_ENUM_NAMED(NSInteger, ToastPosition, "ToastPosition", closed) {
  ToastPositionTop = 0,
  ToastPositionCenter = 1,
  ToastPositionBottom = 2,
  ToastPositionTopLeft = 3,
  ToastPositionTopRight = 4,
  ToastPositionCenterLeft = 5,
  ToastPositionCenterRight = 6,
  ToastPositionBottomLeft = 7,
  ToastPositionBottomRight = 8,
};

@class UIColor;
@class UIFont;

/// <code>ToastStyle</code> instances define the look and feel for toast views created via the
/// <code>makeToast</code> methods as well for toast views created directly with
/// <code>toastViewForMessage(message:title:image:style:)</code>.
/// @warning <code>ToastStyle</code> offers relatively simple styling options for the default
/// toast view. If you require a toast view with more complex UI, it probably makes more
/// sense to create your own custom UIView subclass and present it with the <code>showToast</code>
/// methods.
SWIFT_CLASS_NAMED("ToastStyle")
@interface ToastStyle : NSObject
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
/// The background color. Default is <code>.black</code> at 80% opacity.
@property (nonatomic, strong) UIColor * _Nonnull backgroundColor;
/// The title color. Default is <code>UIColor.whiteColor()</code>.
@property (nonatomic, strong) UIColor * _Nonnull titleColor;
/// The message color. Default is <code>.white</code>.
@property (nonatomic, strong) UIColor * _Nonnull messageColor;
/// A percentage value from 0.0 to 1.0, representing the maximum width of the toast
/// view relative to it’s superview. Default is 0.8 (80% of the superview’s width).
@property (nonatomic) CGFloat maxWidthPercentage;
/// A percentage value from 0.0 to 1.0, representing the maximum height of the toast
/// view relative to it’s superview. Default is 0.8 (80% of the superview’s height).
@property (nonatomic) CGFloat maxHeightPercentage;
/// The spacing from the horizontal edge of the toast view to the content. When an image
/// is present, this is also used as the padding between the image and the text.
/// Default is 10.0.
@property (nonatomic) CGFloat horizontalPadding;
/// The spacing from the vertical edge of the toast view to the content. When a title
/// is present, this is also used as the padding between the title and the message.
/// Default is 10.0. On iOS11+, this value is added added to the <code>safeAreaInset.top</code>
/// and <code>safeAreaInsets.bottom</code>.
@property (nonatomic) CGFloat verticalPadding;
/// The corner radius. Default is 10.0.
@property (nonatomic) CGFloat cornerRadius;
/// The title font. Default is <code>.boldSystemFont(16.0)</code>.
@property (nonatomic, strong) UIFont * _Nonnull titleFont;
/// The message font. Default is <code>.systemFont(ofSize: 16.0)</code>.
@property (nonatomic, strong) UIFont * _Nonnull messageFont;
/// The title text alignment. Default is <code>NSTextAlignment.Left</code>.
@property (nonatomic) NSTextAlignment titleAlignment;
/// The message text alignment. Default is <code>NSTextAlignment.Left</code>.
@property (nonatomic) NSTextAlignment messageAlignment;
/// The maximum number of lines for the title. The default is 0 (no limit).
@property (nonatomic) NSInteger titleNumberOfLines;
/// The maximum number of lines for the message. The default is 0 (no limit).
@property (nonatomic) NSInteger messageNumberOfLines;
/// Enable or disable a shadow on the toast view. Default is <code>false</code>.
@property (nonatomic) BOOL displayShadow;
/// The shadow color. Default is <code>.black</code>.
@property (nonatomic, strong) UIColor * _Nonnull shadowColor;
/// A value from 0.0 to 1.0, representing the opacity of the shadow.
/// Default is 0.8 (80% opacity).
@property (nonatomic) float shadowOpacity;
/// The shadow radius. Default is 6.0.
@property (nonatomic) CGFloat shadowRadius;
/// The shadow offset. The default is 4 x 4.
@property (nonatomic) CGSize shadowOffset;
/// The image size. The default is 80 x 80.
@property (nonatomic) CGSize imageSize;
/// The size of the toast activity view when <code>makeToastActivity(position:)</code> is called.
/// Default is 100 x 100.
@property (nonatomic) CGSize activitySize;
/// The fade in/out animation duration. Default is 0.2.
@property (nonatomic) NSTimeInterval fadeDuration;
/// Activity indicator color. Default is <code>.white</code>.
@property (nonatomic, strong) UIColor * _Nonnull activityIndicatorColor;
/// Activity background color. Default is <code>.black</code> at 80% opacity.
@property (nonatomic, strong) UIColor * _Nonnull activityBackgroundColor;
@end


@class UIImage;

@interface UIView (SWIFT_EXTENSION(Toast_Swift))
- (void)makeToastWith:(NSString * _Nullable)message;
- (void)makeToastWith:(NSString * _Nullable)message point:(CGPoint)point;
- (void)makeToastWith:(NSString * _Nullable)message offset:(CGPoint)offset;
/// Displays any view as toast at a provided position and duration. The completion closure
/// executes when the toast view completes. <code>didTap</code> will be <code>true</code> if the toast view was
/// dismissed from a tap.
/// @param toast The view to be displayed as toast
/// @param duration The notification duration
/// @param position The toast’s position
/// @param completion The completion block, executed after the toast view disappears.
/// didTap will be <code>true</code> if the toast view was dismissed from a tap.
- (void)showToast:(UIView * _Nonnull)toast duration:(NSTimeInterval)duration position:(enum ToastPosition)position completion:(void (^ _Nullable)(BOOL))completion;
- (void)showToast:(UIView * _Nonnull)toast duration:(NSTimeInterval)duration position:(enum ToastPosition)position completion:(void (^ _Nullable)(BOOL))completion offset:(CGPoint)offset;
/// Displays any view as toast at a provided center point and duration. The completion closure
/// executes when the toast view completes. <code>didTap</code> will be <code>true</code> if the toast view was
/// dismissed from a tap.
/// @param toast The view to be displayed as toast
/// @param duration The notification duration
/// @param point The toast’s center point
/// @param completion The completion block, executed after the toast view disappears.
/// didTap will be <code>true</code> if the toast view was dismissed from a tap.
- (void)showToast:(UIView * _Nonnull)toast duration:(NSTimeInterval)duration point:(CGPoint)point completion:(void (^ _Nullable)(BOOL))completion;
/// Hides the active toast. If there are multiple toasts active in a view, this method
/// hides the oldest toast (the first of the toasts to have been presented).
/// @see <code>hideAllToasts()</code> to remove all active toasts from a view.
/// @warning This method has no effect on activity toasts. Use <code>hideToastActivity</code> to
/// hide activity toasts.
- (void)hideToast;
/// Hides an active toast.
/// @param toast The active toast view to dismiss. Any toast that is currently being displayed
/// on the screen is considered active.
/// @warning this does not clear a toast view that is currently waiting in the queue.
- (void)hideToast:(UIView * _Nonnull)toast;
/// Hides all toast views.
/// @param includeActivity If <code>true</code>, toast activity will also be hidden. Default is <code>false</code>.
/// @param clearQueue If <code>true</code>, removes all toast views from the queue. Default is <code>true</code>.
- (void)hideAllToastsWithIncludeActivity:(BOOL)includeActivity clearQueue:(BOOL)clearQueue;
/// Removes all toast views from the queue. This has no effect on toast views that are
/// active. Use <code>hideAllToasts(clearQueue:)</code> to hide the active toasts views and clear
/// the queue.
- (void)clearToastQueue;
- (void)makeToastActivityWith:(enum ToastPosition)position;
/// Creates and displays a new toast activity indicator view at a specified position.
/// @warning Only one toast activity indicator view can be presented per superview. Subsequent
/// calls to <code>makeToastActivity(position:)</code> will be ignored until <code>hideToastActivity()</code> is called.
/// @warning <code>makeToastActivity(position:)</code> works independently of the <code>showToast</code> methods. Toast
/// activity views can be presented and dismissed while toast views are being displayed.
/// <code>makeToastActivity(position:)</code> has no effect on the queueing behavior of the <code>showToast</code> methods.
/// @param point The toast’s center point
- (void)makeToastActivity:(CGPoint)point;
/// Dismisses the active toast activity indicator view.
- (void)hideToastActivity;
/// Creates a new toast view with any combination of message, title, and image.
/// The look and feel is configured via the style. Unlike the <code>makeToast</code> methods,
/// this method does not present the toast view automatically. One of the <code>showToast</code>
/// methods must be used to present the resulting view.
/// @warning if message, title, and image are all nil, this method will throw
/// <code>ToastError.missingParameters</code>
/// @param message The message to be displayed
/// @param title The title
/// @param image The image
/// @param style The style. The shared style will be used when nil
/// @throws <code>ToastError.missingParameters</code> when message, title, and image are all nil
/// @return The newly created toast view
- (UIView * _Nullable)toastViewForMessage:(NSString * _Nullable)message title:(NSString * _Nullable)title image:(UIImage * _Nullable)image style:(ToastStyle * _Nonnull)style error:(NSError * _Nullable * _Nullable)error SWIFT_WARN_UNUSED_RESULT;
@end

#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif
