import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers
// trim <in.jpg> [pad]: crop to the widest block of ink (the photo and its labels), dropping the white margin and any text
// separated from it by a white gap; in place, JPEG q 0.9.
let a = CommandLine.arguments
guard a.count >= 2 else { print("usage: trim <img> [pad]"); exit(1) }
let url = URL(fileURLWithPath: a[1]) as CFURL
let pad = a.count > 2 ? Int(a[2])! : 14
guard let src = CGImageSourceCreateWithURL(url, nil), let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { exit(1) }
let w = img.width, h = img.height
var px = [UInt8](repeating: 0, count: w * h * 4)
let ctx = CGContext(data: &px, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
var x0 = w, y0 = h, x1 = -1, y1 = -1
for y in 0..<h { for x in 0..<w { let i = (y * w + x) * 4
  if px[i] < 225 || px[i+1] < 225 || px[i+2] < 225 { if x < x0 {x0 = x}; if x > x1 {x1 = x}; if y < y0 {y0 = y}; if y > y1 {y1 = y} } } }
if x1 < 0 { exit(0) }
// keep only the run of columns (gaps under 1.5% of the width are bridged) holding the most ink: drops stray text beside the photo
var col = [Int](repeating: 0, count: w)
for y in 0..<h { for x in 0..<w { let i = (y * w + x) * 4; if px[i] < 225 || px[i+1] < 225 || px[i+2] < 225 { col[x] += 1 } } }
let gap = max(8, w * 15 / 1000)
var best = (0, 0, 0), cur = (-1, -1, 0), blank = 0
for x in 0..<w {
  if col[x] > 0 { if cur.0 < 0 { cur = (x, x, 0) }; cur.1 = x; cur.2 += col[x]; blank = 0 }
  else if cur.0 >= 0 { blank += 1; if blank > gap { if cur.2 > best.2 { best = cur }; cur = (-1, -1, 0) } }
}
if cur.0 >= 0 && cur.2 > best.2 { best = cur }
x0 = best.0; x1 = best.1; y0 = h; y1 = -1
for y in 0..<h { for x in x0...x1 { let i = (y * w + x) * 4; if px[i] < 225 || px[i+1] < 225 || px[i+2] < 225 { if y < y0 {y0 = y}; if y > y1 {y1 = y} } } }
x0 = max(0, x0 - pad); y0 = max(0, y0 - pad); x1 = min(w - 1, x1 + pad); y1 = min(h - 1, y1 + pad)
let out = img.cropping(to: CGRect(x: x0, y: y0, width: x1 - x0 + 1, height: y1 - y0 + 1))!
let dst = CGImageDestinationCreateWithURL(url, UTType.jpeg.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dst, out, [kCGImageDestinationLossyCompressionQuality: 0.9] as CFDictionary)
CGImageDestinationFinalize(dst)
print("\(a[1]) \(w)x\(h) -> \(x1-x0+1)x\(y1-y0+1)")
