// ocr <image>... -> one JSON object per line: {"file":..., "w":W, "h":H, "items":[{"t":text,"c":conf,"b":[x0,y0,x1,y1] px, top-left origin}]}
import Foundation
import Vision
import AppKit

for path in CommandLine.arguments.dropFirst() {
    guard let img = NSImage(contentsOfFile: path), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
    let W = Double(cg.width), H = Double(cg.height)
    var items: [[String: Any]] = []
    let req = VNRecognizeTextRequest { r, _ in
        for o in (r.results as? [VNRecognizedTextObservation]) ?? [] {
            guard let top = o.topCandidates(1).first else { continue }
            // per-character boxes for multi-token strings so "12 13" splits
            let s = top.string
            var idx = s.startIndex
            for token in s.split(separator: " ", omittingEmptySubsequences: true) {
                guard let rng = s.range(of: token, range: idx..<s.endIndex) else { continue }
                idx = rng.upperBound
                if let bb = try? top.boundingBox(for: rng)?.boundingBox {
                    items.append(["t": String(token), "c": top.confidence,
                                  "b": [bb.minX * W, (1 - bb.maxY) * H, bb.maxX * W, (1 - bb.minY) * H]])
                }
            }
        }
    }
    req.recognitionLevel = .accurate
    req.usesLanguageCorrection = false
    req.minimumTextHeight = 0.006
    try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
    let obj: [String: Any] = ["file": path, "w": W, "h": H, "items": items]
    if let d = try? JSONSerialization.data(withJSONObject: obj), let line = String(data: d, encoding: .utf8) { print(line) }
}
