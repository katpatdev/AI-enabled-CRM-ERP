from datetime import datetime

from sqlalchemy.orm import Session

from app.config import settings
from app.models import (
    Guest,
    ItineraryStop,
    KnowledgeChunk,
    InventoryItem,
    SensorReading,
    SystemState,
    Booking,
    Offer,
    CabinStatus,
    WorkOrder,
    Feedback,
    CrewMember,
    Notification,
)


def seed_database(db: Session) -> None:
    if db.query(Guest).first():
        return

    db.add(
        SystemState(
            id=1,
            edge_online=settings.edge_online_default,
            risk_banner=(
                "Red Sea corridor advisory: elevated maritime risk near southern approaches. "
                "Suggested re-provision hub: Jeddah Islamic Port (safe alternative: Aqaba)."
            ),
        )
    )

    guests = [
        Guest(
            name="Layla Al-Harbi",
            email="layla@example.com",
            cabin="A-1204",
            loyalty_tier="Diamond",
            loyalty_points=12840,
            dietary="Halal",
            faith_prefs="Prayer times + Qibla",
            mobility="Standard",
            language="ar",
            interests="spa,heritage,fine dining",
            gcc_visa_status="Valid",
            nationality="Saudi Arabia",
            check_in_status="Onboard",
        ),
        Guest(
            name="James Okonkwo",
            email="james@example.com",
            cabin="B-0808",
            loyalty_tier="Pearl",
            loyalty_points=2100,
            dietary="Vegetarian",
            faith_prefs="None",
            mobility="Limited stairs",
            language="en",
            interests="snorkeling,photography,family",
            gcc_visa_status="Valid",
            nationality="Nigeria",
            check_in_status="Onboard",
        ),
        Guest(
            name="Mei Chen",
            email="mei@example.com",
            cabin="A-0412",
            loyalty_tier="Gold",
            loyalty_points=5600,
            dietary="Halal-friendly",
            faith_prefs="Quiet hours",
            mobility="Standard",
            language="en",
            interests="culture,shopping,tea",
            gcc_visa_status="Pending insurance check",
            nationality="Singapore",
            check_in_status="Onboard",
        ),
        Guest(
            name="Omar Farouk",
            email="omar@example.com",
            cabin="C-2210",
            loyalty_tier="Pearl",
            loyalty_points=980,
            dietary="Halal",
            faith_prefs="Prayer reminders",
            mobility="Standard",
            language="ar",
            interests="diving,desert,family",
            gcc_visa_status="Valid",
            nationality="Egypt",
            check_in_status="Shore excursion",
        ),
        Guest(
            name="Sara Nasser",
            email="sara@example.com",
            cabin="A-0901",
            loyalty_tier="Gold",
            loyalty_points=7200,
            dietary="Halal",
            faith_prefs="Prayer times + Qibla",
            mobility="Standard",
            language="ar",
            interests="family,shopping,spa",
            gcc_visa_status="Valid",
            nationality="UAE",
            check_in_status="Onboard",
        ),
    ]
    db.add_all(guests)
    db.flush()

    stops = [
        ItineraryStop(
            day=1,
            port="Muscat, Oman",
            sea="Arabian Sea",
            arrival="08:00",
            departure="18:00",
            highlight="Mutrah Souq and Sultan Qaboos Grand Mosque shore day",
            weather_note="Clear, 32C. Ideal for souq walking tours",
        ),
        ItineraryStop(
            day=3,
            port="Jeddah, Saudi Arabia",
            sea="Red Sea",
            arrival="07:00",
            departure="22:00",
            highlight="Historic Al-Balad and Red Sea corniche",
            weather_note="Warm evening breeze. Spa and indoor dining recommended midday",
        ),
        ItineraryStop(
            day=5,
            port="Aqaba, Jordan",
            sea="Red Sea",
            arrival="09:00",
            departure="20:00",
            highlight="Wadi Rum desert excursion or reef snorkel",
            weather_note="Sunny, low humidity. Popular for desert jeep tours",
        ),
    ]
    db.add_all(stops)

    offers = [
        Offer(
            offer_type="dining",
            title="Al Bahar Halal Restaurant",
            description="Certified Halal fine dining on Deck 8. Kabsa tasting menu available.",
            port="Onboard",
            base_price_sar=0,
            demand_score=0.72,
            capacity=60,
            booked=38,
            dietary_tags="halal",
        ),
        Offer(
            offer_type="dining",
            title="Oasis Vegetarian Cafe",
            description="Plant-forward mezze and Arabic coffee near the library.",
            port="Onboard",
            base_price_sar=0,
            demand_score=0.45,
            capacity=40,
            booked=12,
            dietary_tags="vegetarian,vegan",
        ),
        Offer(
            offer_type="excursion",
            title="Jeddah Al-Balad Heritage Walk",
            description="3-hour guided walk through UNESCO Al-Balad with sweets tasting.",
            port="Jeddah",
            base_price_sar=185,
            demand_score=0.81,
            capacity=30,
            booked=24,
            dietary_tags="halal",
        ),
        Offer(
            offer_type="excursion",
            title="Wadi Rum Sunset Jeep Safari",
            description="Family-friendly jeep safari with seated viewing option.",
            port="Aqaba",
            base_price_sar=420,
            demand_score=0.88,
            capacity=24,
            booked=21,
            dietary_tags="",
        ),
        Offer(
            offer_type="excursion",
            title="Muscat Mutrah Souq and Grand Mosque",
            description="Half-day coach tour. Modest dress required.",
            port="Muscat",
            base_price_sar=160,
            demand_score=0.55,
            capacity=40,
            booked=18,
            dietary_tags="",
        ),
        Offer(
            offer_type="spa",
            title="Pearl Spa Hammam Ritual",
            description="90-minute hammam and aromatherapy. Diamond guests get 15% off.",
            port="Onboard",
            base_price_sar=280,
            demand_score=0.64,
            capacity=16,
            booked=9,
            dietary_tags="",
        ),
    ]
    db.add_all(offers)
    db.flush()

    knowledge = [
        KnowledgeChunk(
            category="dining",
            title="Al Bahar Halal Restaurant",
            content=(
                "Al Bahar serves certified Halal fine dining on Deck 8. Signature dishes: "
                "Red Sea hammour, Kabsa, and dates souffle. Open 18:00 to 22:30. Dress code smart casual. "
                "Wheelchair accessible via aft elevator."
            ),
            tags="halal,dinner,fine dining,kabsa",
        ),
        KnowledgeChunk(
            category="dining",
            title="Oasis Vegetarian Cafe",
            content=(
                "Oasis Cafe on Deck 5 offers vegetarian and vegan bowls, mezze, and Arabic coffee. "
                "Open all day. Quiet seating near the library for prayer-adjacent calm."
            ),
            tags="vegetarian,vegan,cafe,lunch",
        ),
        KnowledgeChunk(
            category="excursion",
            title="Jeddah Al-Balad Heritage Walk",
            content=(
                "Guided walking tour of UNESCO-listed Al-Balad. Duration 3 hours. Moderate walking. "
                "Includes historic merchant houses and local sweets tasting. Price 185 SAR."
            ),
            tags="jeddah,heritage,walking,culture",
        ),
        KnowledgeChunk(
            category="excursion",
            title="Wadi Rum Sunset Jeep Safari",
            content=(
                "From Aqaba pier: jeep safari into Wadi Rum with sunset tea. Family friendly. "
                "Limited mobility option available with seated viewing. Price 420 SAR."
            ),
            tags="aqaba,desert,family,sunset",
        ),
        KnowledgeChunk(
            category="excursion",
            title="Muscat Mutrah Souq and Grand Mosque",
            content=(
                "Half-day coach tour: Mutrah Corniche, Souq, and exterior visit to Sultan Qaboos Grand Mosque. "
                "Modest dress required. Price 160 SAR."
            ),
            tags="muscat,souq,mosque,culture",
        ),
        KnowledgeChunk(
            category="spa",
            title="Pearl Spa and Wellness",
            content=(
                "Pearl Spa offers hammam, aromatherapy, and couples suites. Midday heat packages recommended "
                "when outdoor decks are busy. Loyalty Diamond guests receive 15% off."
            ),
            tags="spa,wellness,heat,diamond",
        ),
        KnowledgeChunk(
            category="policy",
            title="Faith and Prayer Facilities",
            content=(
                "Dedicated prayer room on Deck 4 midship. Cabin app shows dynamic Qibla and prayer times "
                "based on ship GPS. Quiet hours 04:30 to 06:00 for Fajr guests."
            ),
            tags="prayer,qibla,faith,cabin",
        ),
        KnowledgeChunk(
            category="weather",
            title="Onboard weather playbook",
            content=(
                "When outdoor decks exceed 35C or winds rise, concierge prioritizes spa, indoor dining, "
                "and cultural lectures in the Orion Theatre."
            ),
            tags="weather,indoor,spa,theatre",
        ),
        KnowledgeChunk(
            category="loyalty",
            title="Pearl Points program",
            content=(
                "Earn 1 point per SAR spent onboard. Pearl 0+, Gold 5000+, Diamond 10000+. "
                "Redeem 500 points for a complimentary specialty coffee or mini-bar refill."
            ),
            tags="loyalty,points,rewards",
        ),
    ]
    db.add_all(knowledge)

    inventory = [
        InventoryItem(
            sku="HAL-CHK-01",
            name="Halal chicken (vacuum)",
            category="Protein",
            quantity=85,
            unit="kg",
            min_quantity=40,
            halal_certified=True,
            location="Cold Store A",
        ),
        InventoryItem(
            sku="HAL-DAT-02",
            name="Medjool dates",
            category="Dry Goods",
            quantity=12,
            unit="kg",
            min_quantity=20,
            halal_certified=True,
            location="Pantry B",
        ),
        InventoryItem(
            sku="SEA-HAM-03",
            name="Fresh hammour",
            category="Seafood",
            quantity=28,
            unit="kg",
            min_quantity=25,
            halal_certified=True,
            location="Cold Store A",
        ),
        InventoryItem(
            sku="BEV-ARA-04",
            name="Arabic coffee beans",
            category="Beverage",
            quantity=8,
            unit="kg",
            min_quantity=15,
            halal_certified=True,
            location="Galley Store",
        ),
        InventoryItem(
            sku="SPA-OIL-05",
            name="Argan spa oil",
            category="Spa",
            quantity=22,
            unit="L",
            min_quantity=10,
            halal_certified=True,
            location="Spa Stores",
        ),
    ]
    db.add_all(inventory)

    now = datetime.utcnow()
    sensors = [
        SensorReading(
            sensor_id="CS-A-TEMP",
            location="Cold Store A (Halal protein)",
            value=1.8,
            min_safe=-2.0,
            max_safe=4.0,
            recorded_at=now,
            alert=False,
        ),
        SensorReading(
            sensor_id="CS-A-HUM",
            location="Cold Store A (humidity %)",
            metric="humidity_pct",
            value=72.0,
            min_safe=40.0,
            max_safe=75.0,
            recorded_at=now,
            alert=False,
        ),
        SensorReading(
            sensor_id="CS-B-TEMP",
            location="Cold Store B (mixed cargo ALERT DEMO)",
            value=7.4,
            min_safe=-2.0,
            max_safe=4.0,
            recorded_at=now,
            alert=True,
        ),
    ]
    db.add_all(sensors)

    cabins = [
        CabinStatus(cabin="A-1204", guest_id=1, housekeeping="Ready", mini_bar="Stocked", service_notes="Turndown at 21:00"),
        CabinStatus(cabin="B-0808", guest_id=2, housekeeping="In progress", mini_bar="Low", service_notes="Guest prefers extra towels"),
        CabinStatus(cabin="A-0412", guest_id=3, housekeeping="Ready", mini_bar="Stocked", service_notes=""),
        CabinStatus(cabin="C-2210", guest_id=4, housekeeping="Ready", mini_bar="Stocked", service_notes="On shore excursion"),
        CabinStatus(cabin="A-0901", guest_id=5, housekeeping="Inspect", mini_bar="Stocked", service_notes="Family cabin setup"),
    ]
    db.add_all(cabins)

    work_orders = [
        WorkOrder(
            title="Elevator vibration Deck 7 aft",
            asset="Elevator EL-07",
            priority="High",
            status="Open",
            assigned_to="Tech. Rami",
            notes="Predicted from vibration sensors. Spare belt in inventory.",
        ),
        WorkOrder(
            title="HVAC filter change Cold Store B",
            asset="HVAC-CS-B",
            priority="Critical",
            status="In progress",
            assigned_to="Tech. Nora",
            notes="Linked to temperature alert on CS-B-TEMP.",
        ),
        WorkOrder(
            title="Pool pump routine service",
            asset="Pool Pump P-02",
            priority="Low",
            status="Scheduled",
            assigned_to="Unassigned",
            notes="Next port day window in Jeddah.",
        ),
    ]
    db.add_all(work_orders)

    feedback_rows = [
        Feedback(
            guest_id=1,
            rating=5,
            category="Dining",
            comment="Al Bahar Kabsa was excellent. Staff understood Halal preferences.",
            sentiment="Positive",
        ),
        Feedback(
            guest_id=2,
            rating=3,
            category="Excursion",
            comment="Muscat tour had long waits at the coach. Accessibility could improve.",
            sentiment="Neutral",
        ),
        Feedback(
            guest_id=3,
            rating=4,
            category="Cabin",
            comment="Quiet hours helped. Would love more tea selection.",
            sentiment="Positive",
        ),
    ]
    db.add_all(feedback_rows)

    crew = [
        CrewMember(name="Capt. Yasmin Al-Rashid", role="Master", department="Bridge", shift="Day", on_duty=True),
        CrewMember(name="Chef Khalid Mansour", role="Executive Chef", department="F&B", shift="Day", on_duty=True),
        CrewMember(name="Aisha Rahman", role="Guest Concierge Lead", department="Guest Services", shift="Evening", on_duty=True),
        CrewMember(name="Tech. Nora Haddad", role="HVAC Specialist", department="Engineering", shift="Day", on_duty=True),
        CrewMember(name="Fatima Noor", role="Housekeeping Supervisor", department="Hotel", shift="Day", on_duty=False),
    ]
    db.add_all(crew)

    notifications = [
        Notification(
            guest_id=1,
            title="Maghrib reminder",
            body="Prayer room Deck 4 is open. Qibla is updated for current ship position.",
            kind="faith",
        ),
        Notification(
            guest_id=1,
            title="Diamond perk unlocked",
            body="15% off Pearl Spa hammam today. Book from Experiences.",
            kind="loyalty",
        ),
        Notification(
            guest_id=2,
            title="Accessibility tip",
            body="Aft elevators recommended for Deck 8 dining. Concierge can escort.",
            kind="info",
        ),
        Notification(
            guest_id=None,
            title="Ship broadcast",
            body="Evening cultural lecture in Orion Theatre at 20:00 (indoor heat plan).",
            kind="broadcast",
        ),
    ]
    db.add_all(notifications)

    db.add(
        Booking(
            guest_id=1,
            offer_id=1,
            booking_type="dining",
            title="Al Bahar Halal Restaurant",
            details="Table for 2 at 19:30. Kabsa tasting",
            amount_sar=0.0,
            status="confirmed",
            synced_at=now,
        )
    )

    db.commit()
