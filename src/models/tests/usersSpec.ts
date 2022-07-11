import { users_model } from '../users';
const users=new users_model;
describe("user_nodel",():void=>{
    it('should have an index method', () => {
        expect(users.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(users.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(users.create).toBeDefined();
      });
    
      it('should have an update method', () => {
        expect(users.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(users.delete).toBeDefined();
      });
      it('should have an authenticate method', () => {
        expect(users.authenticate).toBeDefined();
      });

        it("create method should add new user",async()=>{
        const data=await users.create({
            firstname:"akram",
            lastname:"gamal",
            password:"123"
        });
        expect(data).toEqual({
            id:1,
            firstname:"akram",
            lastname:"gamal",
            password:"123"
        })
        });
        it("index method should show all users",async()=>{
            const data=await users.index();
            expect(data).toEqual([{
                id:1,
                firstname:"akram",
                lastname:"gamal",
                password:"123"
            }])
            });
        it("show method should show one user",async()=>{
                const data=await users.show(1);
                expect(data).toEqual({
                    id:1,
                    firstname:"akram",
                    lastname:"gamal",
                    password:"123"
                });
        });
        it("update method should update user",async()=>{
            const data=await users.update({
                    id:1,
                    firstname:"akram",
                    lastname:"gemy",
                    password:"12333"
            });
            expect(data).toEqual({
                id:1,
                firstname:"akram",
                lastname:"gemy",
                password:"12333"
            });
     });
     it("delete method should delete one user",async()=>{
        await users.delete(1);
        const data=await users.index();
        expect(data).toEqual([]);
     });
});