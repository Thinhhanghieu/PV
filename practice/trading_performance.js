/**
 * CASE: Trading Performance (Batching Updates)
 * 
 * Thách thức: WebSocket trả về 100 message/giây. Nếu mỗi lần render 1 lần sẽ treo UI.
 * Giải pháp: Batching (Gom lại render 1 lần).
 */

class OrderBookTracker {
    constructor() {
        this.updates = [];
        this.batchInterval = 200; // 200ms render 1 lần
        this.timer = null;
    }

    // Nhận message từ WebSocket
    onMessage(newOrder) {
        this.updates.push(newOrder);

        if (!this.timer) {
            this.timer = setTimeout(() => {
                this.flushUpdates();
            }, this.batchInterval);
        }
    }

    // Thực hiện render dữ liệu đã gom
    flushUpdates() {
        console.log(`Rendering batch of ${this.updates.length} updates to the chart...`);
        
        // Logic render thực tế (Vd: set state trong React)
        // const combinedData = combine(this.updates);
        // updateUI(combinedData);

        this.updates = []; // Clear batch
        this.timer = null;
    }
}

// Giả lập nhận dữ liệu dồn dập
const tracker = new OrderBookTracker();
tracker.onMessage({ price: 100, size: 1 });
tracker.onMessage({ price: 101, size: 2 });
tracker.onMessage({ price: 102, size: 5 });

// Log: Sau 200ms sẽ thấy thông báo "Rendering batch of 3 updates..."
