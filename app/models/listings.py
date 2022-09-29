from .db import db
from datetime import datetime



class Listing(db.Model):
    __tablename__= "listings"


    id = db.Column(db.Integer, primary_key= True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    apparel_id = db.Column(db.Integer, db.ForeignKey("apparels.id"))
    size = db.Column(db.Integer)
    price = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    #relationships
    #one-to-many... user can have many listings, a listing can only have 1 user. 
    user = db.relationship("User", back_populates="listing")
    #one-to-many... listings 
    apparel = db.relationship("Apparel", back_populates="listing")
    #one-to-many... purchases
    purchased = db.relationship("Purchase", back_populates="listing")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'apparelId': self.apparel_id,
            "size": self.size,
            "price": self.price,
            'quantity': self.quantity,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
        
